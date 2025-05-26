import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaRupeeSign } from 'react-icons/fa';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [booking, setBooking] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const [paymentUrl, setPaymentUrl] = useState(null);

    useEffect(() => {
        if (!location.state?.booking) {
            toast.error("No booking information found");
            navigate('/bus-booking');
            return;
        }
        console.log('Booking data:', JSON.stringify(location.state.booking, null, 2));
        setBooking(location.state.booking);
        initiatePayment(location.state.booking);
    }, [location, navigate]);

    const initiatePayment = async (bookingData) => {
        setLoading(true);
        setError(null);

        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
        console.log('VITE_BACKEND_URL:', backendUrl);

        if (!backendUrl || !backendUrl.startsWith('http')) {
            setError('Invalid backend URL. Please check environment variables.');
            toast.error('Invalid backend URL');
            setLoading(false);
            return;
        }

        // Validate bookingData fields
        if (!bookingData.bus?.id || !/^[0-9a-fA-F]{24}$/.test(bookingData.bus.id)) {
            setError('Invalid or missing Bus ID');
            toast.error('Invalid or missing Bus ID');
            setLoading(false);
            return;
        }
        console.log('Bus ID:', bookingData.bus.id);
        if (!Array.isArray(bookingData.selectedSeats) || bookingData.selectedSeats.length === 0) {
            setError('No seats selected');
            toast.error('No seats selected');
            setLoading(false);
            return;
        }
        if (!bookingData.journeyDate || !/^\d{4}-\d{2}-\d{2}$/.test(bookingData.journeyDate)) {
            setError('Invalid travel date format (expected YYYY-MM-DD)');
            toast.error('Invalid travel date format');
            setLoading(false);
            return;
        }
        if (!bookingData.totalAmount || typeof bookingData.totalAmount !== 'number' || bookingData.totalAmount <= 0) {
            setError('Invalid amount');
            toast.error('Invalid amount');
            setLoading(false);
            return;
        }
        if (!Array.isArray(bookingData.passengerInfo) || bookingData.passengerInfo.length === 0) {
            setError('Passenger information is missing');
            toast.error('Passenger information is missing');
            setLoading(false);
            return;
        }
        for (const passenger of bookingData.passengerInfo) {
            if (!passenger.name || !passenger.age || !['Male', 'Female', 'Other'].includes(passenger.gender)) {
                setError('Invalid passenger information: name, age, or gender is missing or invalid');
                toast.error('Invalid passenger information');
                setLoading(false);
                return;
            }
        }

        const payload = {
            busId: bookingData.bus.id,
            seats: bookingData.selectedSeats,
            travelDate: bookingData.journeyDate,
            amount: bookingData.totalAmount,
            passengerInfo: bookingData.passengerInfo,
        };
        console.log('Sending payload:', JSON.stringify(payload, null, 2));

        try {
            const response = await axios.post(
                `${backendUrl}/api/v1/bookings/`,
                payload,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setBooking({
                    ...bookingData,
                    bookingId: response.data.data.bookingId,
                    paymentBreakdown: response.data.data.booking.paymentBreakdown,
                    expiresAt: response.data.data.expiresAt,
                });
                setPaymentUrl(response.data.data.paymentUrl);
                setPaymentData(response.data.data.paymentData);
            } else {
                throw new Error(response.data.message || 'Failed to initiate payment');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.error?.message || 'Failed to initiate payment. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
            console.error('Payment initiation error:', JSON.stringify(err.response?.data, null, 2));
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = () => {
        if (!paymentUrl || !paymentData) {
            toast.error('Payment initialization not complete');
            return;
        }

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = paymentUrl;

        Object.entries(paymentData).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    };

    if (!booking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading booking information...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-blue-600 mb-6"
                        disabled={loading}
                    >
                        <FaArrowLeft className="mr-2" /> Back to booking
                    </button>

                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Payment</h1>
                    <p className="text-gray-600 mb-6">Please complete your payment to confirm your booking</p>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h2 className="font-semibold text-lg mb-4">Booking Summary</h2>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-gray-500 text-sm">Bus</p>
                                <p className="font-medium">{booking.bus.name || booking.bus.busNumber}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Date</p>
                                <p className="font-medium">{new Date(booking.journeyDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Route</p>
                                <p className="font-medium">{booking.bus.route?.from} → {booking.bus.route?.to}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Seats</p>
                                <p className="font-medium">{booking.selectedSeats.join(', ')}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Passengers</p>
                                <p className="font-medium">{booking.passengerInfo.length}</p>
                            </div>
                        </div>

                        {booking.paymentBreakdown ? (
                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-500">Seat Price</p>
                                    <p className="font-medium flex items-center">
                                        <FaRupeeSign className="mr-1" /> {booking.paymentBreakdown.seatPrice}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-500">Service Fee</p>
                                    <p className="font-medium flex items-center">
                                        <FaRupeeSign className="mr-1" /> {booking.paymentBreakdown.serviceFee}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-500">Booking Fee</p>
                                    <p className="font-medium flex items-center">
                                        <FaRupeeSign className="mr-1" /> {booking.paymentBreakdown.bookingFee}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-gray-500 font-semibold">Total Amount</p>
                                    <p className="text-xl font-bold text-blue-600 flex items-center">
                                        <FaRupeeSign className="mr-1" /> {booking.totalAmount}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500">Loading payment details...</div>
                        )}
                    </div>

                    <div className="mb-6">
                        <h2 className="font-semibold text-lg mb-4">Select Payment Method</h2>
                        <div className="border rounded-lg p-4 bg-white">
                            <button
                                onClick={handlePayment}
                                className={`w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading || !paymentUrl || !booking.paymentBreakdown}
                            >
                                {loading ? 'Processing...' : 'Pay with eSewa'}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <p className="text-sm text-gray-500 text-center">
                        Your payment is securely processed by eSewa. We don't store your payment details.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;