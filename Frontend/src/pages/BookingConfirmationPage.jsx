import React from "react";
import { useLocation, useParams } from "react-router-dom";
import BookingConfirmation from "../components/BookingConfirmation";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const BookingConfirmationPage = () => {
    const { state } = useLocation();
    const { id } = useParams();

    // If no state (direct URL access), try to fetch from API
    if (!state?.bookingDetails) {
        // You could implement API fetching here if needed
        toast.error("Booking details not found");
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">Booking Not Found</h2>
                    <button
                        onClick={() => window.location.href = '/bus-booking'}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center mx-auto"
                    >
                        <FaArrowLeft className="mr-2" /> Book Another Bus
                    </button>
                </div>
            </div>
        );
    }

    const {
        bookingId,
        busDetails,
        seats,
        journeyDate,
        totalAmount,
        paymentMethod,
        passengerInfo
    } = state.bookingDetails;

    // Format data for the BookingConfirmation component
    const formattedDate = new Date(journeyDate).toLocaleDateString();
    const firstSeat = seats.length > 0 ? seats[0] : 'N/A';
    const passengerName = passengerInfo?.name || 'N/A';

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <BookingConfirmation
                bookingId={bookingId || id}
                passenger={passengerName}
                bus={busDetails?.name || busDetails?.busNumber || 'N/A'}
                seat={seats.join(', ')}
                date={formattedDate}
                departure={busDetails?.schedule?.departure || 'N/A'}
                price={`NPR ${totalAmount}`}
                paymentMethod={paymentMethod}
                from={busDetails?.route?.from || 'N/A'}
                to={busDetails?.route?.to || 'N/A'}
                qrCodeUrl={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${bookingId || id}`}
                onPrint={() => window.print()}
                onDownload={() => {
                    // Implement download logic here
                    toast.success("Ticket downloaded successfully");
                }}
                onBookAnother={() => window.location.href = '/bus-booking'}
            />
        </div>
    );
};

export default BookingConfirmationPage;