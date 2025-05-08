import React from "react";
import { FaCheckCircle, FaUser, FaBus, FaChair, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaRupeeSign, FaCreditCard } from "react-icons/fa";

const BookingConfirmation = ({
  bookingId = "YATRI–JKL012",
  passenger = "N/A",
  bus = "Annapurna Travels",
  seat = "F1",
  date = "8/25/2024",
  departure = "09:00 AM",
  price = "NPR 750",
  paymentMethod = "IME Pay",
  from = "Kathmandu",
  to = "Pokhara",
  qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=YATRI–JKL012",
  onPrint,
  onDownload,
  onBookAnother
}) => (
  <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-green-200 p-6 mt-8">
    <div className="flex flex-col items-center">
      <FaCheckCircle className="text-green-500 text-5xl mb-2" />
      <h2 className="text-2xl font-bold text-green-700 mb-1">Booking Confirmed!</h2>
      <p className="text-gray-600 mb-4 text-center">Your ticket has been successfully booked. Thank you for choosing YatriSuvidha.</p>
    </div>
    <div className="bg-blue-50 rounded-lg p-4 mb-4 text-center">
      <div className="text-blue-600 font-semibold text-lg">Your E-Ticket</div>
      <div className="text-sm text-blue-700">Booking ID: {bookingId}</div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-700"><FaUser /> <span>Passenger</span>: <span className="font-semibold">{passenger}</span></div>
        <div className="flex items-center gap-2 text-gray-700"><FaBus /> <span>Bus</span>: <span className="font-semibold">{bus}</span></div>
        <div className="flex items-center gap-2 text-gray-700"><FaChair /> <span>Seat</span>: <span className="font-semibold">{seat}</span></div>
        <div className="flex items-center gap-2 text-gray-700"><FaMapMarkerAlt /> <span>From</span>: <span className="font-semibold">{from}</span></div>
        <div className="flex items-center gap-2 text-gray-700"><FaMapMarkerAlt /> <span>To</span>: <span className="font-semibold">{to}</span></div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-700"><FaCalendarAlt /> <span>Date</span>: <span className="font-semibold">{date}</span></div>
        <div className="flex items-center gap-2 text-gray-700"><FaClock /> <span>Departure</span>: <span className="font-semibold">{departure}</span></div>
        <div className="flex items-center gap-2 text-gray-700"><FaRupeeSign /> <span>Price Paid</span>: <span className="font-semibold">{price}</span></div>
        <div className="flex items-center gap-2 text-gray-700"><FaCreditCard /> <span>Payment Method</span>: <span className="font-semibold">{paymentMethod}</span></div>
        <div className="flex flex-col items-center mt-2">
          <span className="text-xs text-gray-500 mb-1">Scan QR Code for Validation:</span>
          <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24 border rounded bg-white" />
        </div>
      </div>
    </div>
    <div className="text-xs text-gray-500 text-center mb-4">
      An email/SMS confirmation with your ticket details has been sent to your registered contact.<br />
      Please present this E-Ticket (or QR code) at the time of boarding.
    </div>
    <div className="flex flex-col md:flex-row gap-2 justify-center">
      <button onClick={onPrint} className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center gap-2">
        <span role="img" aria-label="print">🖨️</span> Print Ticket
      </button>
      <button onClick={onDownload} className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center gap-2">
        <span role="img" aria-label="download">⬇️</span> Download Ticket
      </button>
      <button onClick={onBookAnother} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2">
        Book Another Ticket
      </button>
    </div>
  </div>
);

export default BookingConfirmation; 