import axios from 'axios';
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import { AppError } from "../../middlewares/errorMiddleware.js";
import { Payment } from "../../models/Payment.js";
import Booking  from "../../models/Booking.js";


export const initiateKhaltiPayment = catchAsyncError(async (req, res, next) => {
    const { bookingId, amount } = req.body;
    const userId = req.user._id;

    const booking = await Booking.findOne({
        _id: bookingId,
        user: userId,
        status: 'Pending'
    });
    
    console.log(booking);

    if (!booking) {
        return next(new AppError('Invalid or expired booking', 400));
    }

    const amountInPaisa = amount * 100;

    const payload = {
        return_url: `${process.env.KHALTI_RETURN_URL}?booking=${bookingId}`,
        website_url: process.env.FRONTEND_URL || "http://localhost:3000",
        amount: amountInPaisa,
        purchase_order_id: bookingId,
        purchase_order_name: `Bus Booking ${bookingId}`,
        customer_info: {
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone
        }
    };
    
    console.log(payload);

    try {
        // 4. Initiate payment with Khalti
        const response = await axios.post(
            'https://dev.khalti.com/api/v2/epayment/initiate/',
            payload,
            {
                headers: {
                    'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // 5. Create payment record with all required attributes
        const payment = await Payment.create({
            user: userId,
            booking: bookingId,
            pidx: response.data.pidx,
            amount: amount,
            payment_method: 'khalti',
            status: 'initiated',
            transaction_id: null // Will be updated after verification
        });

        console.log(payment)


        // 6. Return payment URL to frontend
        res.status(200).json({
            success: true,
            payment_url: response.data.payment_url,
            payment_id: payment._id, // Return payment ID for reference
            pidx: payment.pidx // Unique Khalti payment identifier
        });

    } catch (error) {
        console.error('Khalti Payment Initiation Error:', error.response?.data || error.message);

        // Handle Khalti API errors
        if (error.response) {
            return next(new AppError(
                error.response.data?.detail || 'Payment initiation failed',
                error.response.status
            ));
        }
        return next(new AppError('Failed to initiate payment', 500));
    }
});

export const verifyKhaltiPayment = catchAsyncError(async (req, res, next) => {
    const { pidx, transaction_id, amount } = req.body;
    const bookingId = req.query.booking;

    // Verify with Khalti
    let verification;
    try {
        verification = await axios.post(
            'https://dev.khalti.com/api/v2/epayment/lookup/',
            { pidx },
            {
                headers: {
                    'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`
                }
            }
        );
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Khalti verification failed',
            error: err.response?.data || err.message
        });
    }

    if (verification.data.status !== 'Completed') {
        return res.status(400).json({
            success: false,
            message: 'Payment not completed',
            verification: verification.data
        });
    }

    // Update payment record
    const payment = await Payment.findOneAndUpdate(
        { pidx },
        {
            status: 'completed',
            transaction_id,
            amount: amount / 100
        },
        { new: true }
    );

    res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        data: {
            paymentId: payment?._id,
            bookingId
        }
    });
});
