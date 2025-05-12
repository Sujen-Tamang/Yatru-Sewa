import axios from 'axios';
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import { AppError } from "../../middlewares/errorMiddleware.js";
import { Payment } from "../../models/Payment.js";
import Booking from "../../models/Booking.js";

export const initiateEsewaPayment = catchAsyncError(async (req, res, next) => {
    const { bookingId, amount } = req.body;
    const userId = req.user._id;

    // 1. Verify booking
    const booking = await Booking.findOne({
        _id: bookingId,
        user: userId,
        status: 'Pending'
    });

    if (!booking) {
        return next(new AppError('Invalid or expired booking', 400));
    }

    // 2. Generate unique transaction ID
    const transactionId = `TXN-${bookingId}-${Date.now()}`;

    // 3. Prepare eSewa payment parameters
    const payload = {
        amt: amount, // Total amount
        psc: 0, // Service charge
        pdc: 0, // Delivery charge
        txAmt: 0, // Tax amount
        tAmt: amount, // Total amount
        pid: transactionId, // Unique transaction ID
        scd: process.env.ESEWA_MERCHANT_ID, // Merchant code
        su: `${process.env.ESEWA_RETURN_URL}?booking=${bookingId}&pid=${transactionId}`, // Success URL
        fu: `${process.env.ESEWA_FAIL_URL}?booking=${bookingId}` // Failure URL
    };

    try {
        // 4. Create payment record
        const payment = await Payment.create({
            user: userId,
            booking: bookingId,
            pidx: transactionId, // Using transactionId as pidx for eSewa
            amount: amount,
            payment_method: 'esewa',
            status: 'initiated',
            transaction_id: null // Will be updated after verification
        });

        // 5. Generate eSewa payment URL
        const paymentUrl = `${process.env.ESEWA_BASE_URL}/epay/main?${new URLSearchParams(payload).toString()}`;

        // 6. Return payment URL to frontend
        res.status(200).json({
            success: true,
            payment_url: paymentUrl,
            payment_id: payment._id,
            pidx: payment.pidx
        });

    } catch (error) {
        console.error('eSewa Payment Initiation Error:', error.message);
        return next(new AppError('Failed to initiate payment', 500));
    }
});

export const verifyEsewaPayment = catchAsyncError(async (req, res, next) => {
    const { pid, amt, refId } = req.query; // eSewa returns pid, amt, refId
    const bookingId = req.query.booking;

    // 1. Verify booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        return next(new AppError('Invalid booking', 400));
    }

    // 2. Verify payment with eSewa
    const verificationUrl = `${process.env.ESEWA_BASE_URL}/epay/transrec`;
    const verificationParams = {
        amt: amt,
        scd: process.env.ESEWA_MERCHANT_ID,
        pid: pid,
        rid: refId
    };

    try {
        const response = await axios.get(verificationUrl, { params: verificationParams });

        if (response.data.includes('Success')) {
            // 3. Update payment record
            const payment = await Payment.findOneAndUpdate(
                { pidx: pid },
                {
                    status: 'completed',
                    transaction_id: refId,
                    amount: parseFloat(amt)
                },
                { new: true }
            );

            if (!payment) {
                return next(new AppError('Payment record not found', 404));
            }

            // 4. Update booking status
            await Booking.findByIdAndUpdate(bookingId, { status: 'Confirmed' });

            res.status(200).json({
                success: true,
                message: 'Payment verified successfully',
                data: {
                    paymentId: payment._id,
                    bookingId
                }
            });
        } else {
            // Update payment status to failed
            await Payment.findOneAndUpdate(
                { pidx: pid },
                { status: 'failed' },
                { new: true }
            );
            return next(new AppError('Payment verification failed', 400));
        }
    } catch (error) {
        console.error('eSewa Verification Error:', error.response?.data || error.message);
        await Payment.findOneAndUpdate(
            { pidx: pid },
            { status: 'failed' },
            { new: true }
        );
        return next(new AppError('Payment verification failed', 500));
    }
});