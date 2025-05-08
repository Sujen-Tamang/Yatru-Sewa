import { useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaRupeeSign, FaBus, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTicketAlt } from "react-icons/fa";

const seatRows = 8;
const seatCols = 4;
const seatLetters = ["A", "B", "C", "D"];
const bookedSeats = ["1A", "2B", "3C", "4D", "5A", "6B"];

const BookingDetails = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [payment, setPayment] = useState("Khalti");

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : prev.length < 4
        ? [...prev, seat]
        : prev 
    );
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const totalPrice = 700 * selectedSeats.length;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Booking Details */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <FaTicketAlt className="text-blue-600" />
            <h2 className="text-lg font-bold text-blue-700">Booking Details</h2>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-center mb-4">Select Your Seat</h3>
            <div className="bg-gray-50 rounded-xl p-6 mb-2">
              <div className="flex justify-between text-gray-400 text-sm mb-2 px-4">
                <span>Driver</span>
                <span>Door</span>
              </div>
              <div className="flex flex-col items-center">
                {/* Seat Grid */}
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(seatRows)].map((_, rowIdx) =>
                    seatLetters.map((letter, colIdx) => {
                      const seat = `${rowIdx + 1}${letter}`;
                      const isBooked = bookedSeats.includes(seat);
                      const isSelected = selectedSeats.includes(seat);
                      return (
                        <button
                          key={seat}
                          className={`w-10 h-10 rounded flex items-center justify-center border text-lg mb-2
                            ${isBooked ? "bg-red-100 text-red-400 border-red-200 cursor-not-allowed" :
                              isSelected ? "bg-blue-100 text-blue-700 border-blue-400" :
                              "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}
                          `}
                          disabled={isBooked}
                          onClick={() => handleSeatClick(seat)}
                        >
                          <FaUser />
                        </button>
                      );
                    })
                  )}
                </div>
                <div className="flex gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-1 text-blue-600"><span className="w-4 h-4 bg-blue-100 border border-blue-400 rounded inline-block mr-1"></span> Selected</div>
                  <div className="flex items-center gap-1 text-gray-500"><span className="w-4 h-4 bg-white border border-gray-300 rounded inline-block mr-1"></span> Available</div>
                  <div className="flex items-center gap-1 text-red-400"><span className="w-4 h-4 bg-red-100 border border-red-200 rounded inline-block mr-1"></span> Booked</div>
                </div>
              </div>
            </div>
          </div>
          {/* Passenger Info */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Passenger Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter passenger's full name"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 10-digit phone number"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email for confirmation"
                  required
                />
              </div>
            </div>
          </div>
          {/* Payment Method */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Payment Method</h3>
            <div className="flex flex-col gap-3">
              <label className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer ${payment === "Khalti" ? "border-green-400 bg-green-50" : "border-gray-200"}`}>
                <input type="radio" name="payment" value="Khalti" checked={payment === "Khalti"} onChange={handlePaymentChange} className="mr-2" />
                <img src="https://seeklogo.com/images/K/khalti-wallet-logo-0B1F0C6E5A-seeklogo.com.png" alt="Khalti" className="w-6 h-6 mr-2" /> Pay with Khalti
              </label>
              <label className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer ${payment === "IME Pay" ? "border-green-400 bg-green-50" : "border-gray-200"}`}>
                <input type="radio" name="payment" value="IME Pay" checked={payment === "IME Pay"} onChange={handlePaymentChange} className="mr-2" />
                <img src="https://seeklogo.com/images/I/ime-pay-logo-6B2B1B6B2B-seeklogo.com.png" alt="IME Pay" className="w-6 h-6 mr-2" /> Pay with IME Pay
              </label>
            </div>
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 text-lg transition-all">
            <FaRupeeSign /> Proceed to Payment (NPR {totalPrice || 700})
          </button>
        </div>
        {/* Booking Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <FaTicketAlt className="text-blue-600" />
            <h2 className="text-lg font-bold text-blue-700">Booking Summary</h2>
          </div>
          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-500" /> <span>From: <span className="font-semibold">Kathmandu</span></span></div>
            <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-500" /> <span>To: <span className="font-semibold">Pokhara</span></span></div>
            <div className="flex items-center gap-2"><FaCalendarAlt className="text-blue-500" /> <span>Date: <span className="font-semibold">5/21/2025</span></span></div>
            <div className="flex items-center gap-2"><FaBus className="text-blue-500" /> <span>Everest Express</span></div>
            <div className="flex items-center gap-2"><FaClock className="text-blue-500" /> <span>Departure: <span className="font-semibold">07:00 AM</span></span></div>
          </div>
          <div className="border-t my-4"></div>
          <div className="flex items-center gap-2 text-blue-700 font-bold text-lg">
            <FaRupeeSign /> Total Price: NPR {totalPrice || 700}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails; 