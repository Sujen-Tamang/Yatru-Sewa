import React from "react";
import BookingConfirmation from "../components/BookingConfirmation";

const BookingConfirmationPage = () => {
  // Example data, in a real app this would come from booking state or API
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <BookingConfirmation
        bookingId="YATRI–JKL012"
        passenger="N/A"
        bus="Annapurna Travels"
        seat="F1"
        date="8/25/2024"
        departure="09:00 AM"
        price="NPR 750"
        paymentMethod="IME Pay"
        from="Kathmandu"
        to="Pokhara"
        qrCodeUrl="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=YATRI–JKL012"
        onPrint={() => window.print()}
        onDownload={() => alert('Download logic here')}
        onBookAnother={() => window.location.href = '/BusBookingPage'}
      />
    </div>
  );
};

export default BookingConfirmationPage; 