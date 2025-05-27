import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAvailableSeats } from "../../../services/busService";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { FaUser, FaPhone, FaEnvelope, FaRupeeSign, FaBus, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTicketAlt } from "react-icons/fa";

// Constants for seat layout
const seatLetters = ["A", "B", "C", "D"];

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [payment, setPayment] = useState("Khalti");
  const [busData, setBusData] = useState(null);
  const [journeyDate, setJourneyDate] = useState("");
  const [seatData, setSeatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seatLayout, setSeatLayout] = useState({
    rows: 6, // Default, will be updated based on API response
    cols: 4,
    letters: ["A", "B", "C", "D"]
  });

  useEffect(() => {
    // Check if we have bus data in the location state
    if (location.state && location.state.bus) {
      setBusData(location.state.bus);
      setJourneyDate(location.state.journeyDate || "");
    } else {
      // If no data is passed, redirect back to bus booking page
      navigate("/bus-booking");
    }
  }, [location, navigate]);

  // Fetch available seats when bus data and journey date are available
  useEffect(() => {
    const fetchSeats = async () => {
      if (!busData?.id) {
        console.log("Missing bus ID or journey date, cannot fetch seats");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log(`Fetching seats for bus ${busData.id}...`);
        const response = await getAvailableSeats(busData.id);
        console.log("API Response:", response);
        console.log("Success:", response.success);
        console.log("Seats:", response.data?.data?.seats);

        if (response.success && response.data) {
          if (response.data.data && response.data.data.seats) {
            console.log("Setting seat data:", response.data.data.seats);
            setSeatData(response.data.data.seats);

            // Calculate the number of rows based on the seats data
            if (response.data.data.seats && response.data.data.seats.length > 0) {
              // Extract unique row numbers
              const rowNumbers = [...new Set(response.data.data.seats.map(seat => {
                return parseInt(seat.number.match(/^\d+/)[0]);
              }))];
              
              // Sort row numbers to ensure correct order
              rowNumbers.sort((a, b) => a - b);
              
              console.log("Row numbers detected:", rowNumbers);
              setSeatLayout(prev => ({
                ...prev,
                rows: Math.max(...rowNumbers)
              }));
            }
          } else {
            // If API doesn't return seats array, use the sample data for testing
            console.log("API didn't return seats array, using fallback data");
            const fallbackSeats = [
              { number: "1A", available: true, features: [] },
              { number: "1B", available: true, features: [] },
              { number: "1C", available: true, features: [] },
              { number: "1D", available: true, features: [] },
              { number: "2A", available: true, features: [] },
              { number: "2B", available: true, features: [] },
              { number: "2C", available: true, features: [] },
              { number: "2D", available: true, features: [] },
              { number: "3A", available: false, features: [] },
              { number: "3B", available: false, features: [] },
              { number: "3C", available: true, features: [] },
              { number: "3D", available: true, features: [] },
              { number: "4A", available: false, features: [] },
              { number: "4B", available: false, features: [] },
              { number: "4C", available: true, features: [] },
              { number: "4D", available: true, features: [] },
              { number: "5A", available: true, features: [] },
              { number: "5B", available: true, features: [] },
              { number: "5C", available: true, features: [] },
              { number: "5D", available: true, features: [] },
              { number: "6A", available: true, features: [] },
              { number: "6B", available: true, features: [] },
              { number: "6C", available: true, features: [] },
              { number: "6D", available: true, features: [] },
              { number: "7A", available: true, features: [] },
              { number: "7B", available: true, features: [] },
              { number: "7C", available: true, features: [] },
              { number: "7D", available: true, features: [] }
            ];
            setSeatData(fallbackSeats);
            setSeatLayout(prev => ({
              ...prev,
              rows: 7
            }));
          }
        } else {
          throw new Error(response.message || 'Failed to fetch seat availability');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching seat availability');
        console.error('Error fetching seats:', err);

        // Fallback to sample data in case of error
        console.log("Error occurred, using fallback data");
        const fallbackSeats = [
          { number: "1A", available: true, features: [] },
          { number: "1B", available: true, features: [] },
          { number: "1C", available: true, features: [] },
          { number: "1D", available: true, features: [] },
          { number: "2A", available: true, features: [] },
          { number: "2B", available: true, features: [] },
          { number: "2C", available: true, features: [] },
          { number: "2D", available: true, features: [] },
          { number: "3A", available: false, features: [] },
          { number: "3B", available: false, features: [] },
          { number: "3C", available: true, features: [] },
          { number: "3D", available: true, features: [] },
          { number: "4A", available: false, features: [] },
          { number: "4B", available: false, features: [] },
          { number: "4C", available: true, features: [] },
          { number: "4D", available: true, features: [] },
          { number: "5A", available: true, features: [] },
          { number: "5B", available: true, features: [] },
          { number: "5C", available: true, features: [] },
          { number: "5D", available: true, features: [] },
          { number: "6A", available: true, features: [] },
          { number: "6B", available: true, features: [] },
          { number: "6C", available: true, features: [] },
          { number: "6D", available: true, features: [] },
          { number: "7A", available: true, features: [] },
          { number: "7B", available: true, features: [] },
          { number: "7C", available: true, features: [] },
          { number: "7D", available: true, features: [] }
        ];
        setSeatData(fallbackSeats);
        setSeatLayout(prev => ({
          ...prev,
          rows: 7
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [busData, journeyDate]);

  const handleSeatClick = (seatNumber) => {
    const seat = seatData.find(s => s.number === seatNumber);

    if (!seat || !seat.available) return;

    setSelectedSeats((prev) =>
        prev.includes(seatNumber)
            ? prev.filter((s) => s !== seatNumber)
            : prev.length < 10
                ? [...prev, seatNumber]
                : prev
    );
  };


  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  // Handle proceed to payment
  const handleProceedToPayment = async () => {
    // 1. First check authentication
    if (!isAuthenticated) {
      toast.error("Please sign in to proceed with payment");
      sessionStorage.setItem('pendingBooking', JSON.stringify({
        busData,
        journeyDate,
        selectedSeats,
        payment,
        totalPrice
      }));
      navigate('/auth/signin', { state: { from: location.pathname } });
      return;
    }

    // 2. Add a check to ensure currentUser is loaded
    if (!currentUser) {
      toast.error("User data is loading, please wait...");
      return;
    }

    // 3. Debug logging to check verification status
    console.log('Current user verification status:', currentUser.isVerified);
    console.log('Full currentUser object:', currentUser);

    // 4. Improved verification check
    const isUserVerified = currentUser?.isVerified ||
        currentUser?.verified ||
        currentUser?.user?.isVerified;

    if (!isUserVerified) {
      toast.error("Your account needs to be verified before making a payment");
      sessionStorage.setItem('pendingBooking', JSON.stringify({
        busData,
        journeyDate,
        selectedSeats,
        payment,
        totalPrice
      }));
      navigate('/auth/verify', { state: { from: location.pathname } });
      return;
    }

    // 5. Proceed with payment
    const bookingData = {
      bus: busData,
      journeyDate,
      selectedSeats,
      totalAmount: totalPrice,
      paymentMethod: payment,
      passengerInfo: form
    };

    if (payment === "Khalti" || payment === "Esewa") {
      navigate('/payment', {state: {booking: bookingData}});
    } else {
      toast.error("Selected payment method is not available yet");
    }
  };

  const ticketPrice = busData?.price || (busData?.data?.price) || 700;
  const totalPrice = ticketPrice * selectedSeats.length;

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
                  {loading ? (
                      <div className="flex justify-center items-center p-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
                      </div>
                  ) : error ? (
                      <div className="text-red-500 p-4 text-center">
                        {error}
                        <button
                            onClick={() => window.location.reload()}
                            className="block mx-auto mt-2 text-blue-500 underline"
                        >
                          Try Again
                        </button>
                      </div>
                  ) : (
                      <div className="grid gap-4">
                        {/* Display debug info */}
                        {seatData.length === 0 && <div className="col-span-4 text-red-500">No seat data available</div>}

                        {/* Seat layout visualization */}
                        <div className="bus-layout pb-4">
                          {/* Bus front */}
                          <div className="w-full flex justify-center mb-4">
                            <div className="bg-gray-300 rounded-t-lg w-32 h-8 flex items-center justify-center text-gray-700 font-semibold">
                              Driver's Cabin
                            </div>
                          </div>
                          
                          {/* Seat grid */}
                          <div className="grid grid-cols-4 gap-x-8 gap-y-2">
                            {/* Render all seats from seatData */}
                            {seatData.map((seat) => {
                              const seatNumber = seat.number;
                              const isAvailable = seat.available;
                              const isSelected = selectedSeats.includes(seatNumber);

                              const row = parseInt(seatNumber.match(/^\d+/)[0]);
                              const col = seatNumber.charAt(seatNumber.length - 1);
                              
                              // Get column index based on letter (A=0, B=1, C=2, D=3)
                              const colIdx = seatLayout.letters.indexOf(col);

                              let positionClass = "";
                              if (colIdx === 2 && seatLayout.letters[colIdx-1] !== col) {
                                positionClass = "ml-4"; // Add gap between columns B and C
                              }
                              
                              return (
                                <button
                                  key={seatNumber}
                                  className={`w-10 h-10 rounded flex items-center justify-center border text-sm mb-2 relative ${positionClass}
                                    ${!isAvailable ? "bg-red-100 text-red-400 border-red-200 cursor-not-allowed" :
                                      isSelected ? "bg-blue-100 text-blue-700 border-blue-400" :
                                      "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}
                                  `}
                                  disabled={!isAvailable}
                                  onClick={() => handleSeatClick(seatNumber)}
                                >
                                  <span className="absolute top-1 left-1 text-xs">{seatNumber}</span>
                                  <FaUser className="text-xs" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                  )}
                  <div className="flex gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-1 text-blue-600"><span className="w-4 h-4 bg-blue-100 border border-blue-400 rounded inline-block mr-1"></span> Selected</div>
                    <div className="flex items-center gap-1 text-gray-500"><span className="w-4 h-4 bg-white border border-gray-300 rounded inline-block mr-1"></span> Available</div>
                    <div className="flex items-center gap-1 text-red-400"><span className="w-4 h-4 bg-red-100 border border-red-200 rounded inline-block mr-1"></span> Not Available</div>
                  </div>
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
                <label className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer ${payment === "Esewa" ? "border-green-400 bg-green-50" : "border-gray-200"}`}>
                  <input type="radio" name="payment" value="Esewa" checked={payment === "Esewa"} onChange={handlePaymentChange} className="mr-2" />
                  <img src="https://seeklogo.com/images/I/ime-pay-logo-6B2B1B6B2B-seeklogo.com.png" alt="Esewa" className="w-6 h-6 mr-2" /> Pay with Esewa
                </label>
              </div>
            </div>
            <button
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 text-lg transition-all"
                disabled={selectedSeats.length === 0}
                onClick={handleProceedToPayment}
            >
              <FaRupeeSign /> Proceed to Payment (NPR {totalPrice})
            </button>
            {selectedSeats.length === 0 && (
                <p className="text-yellow-600 text-center mt-2 text-sm">Please select at least one seat</p>
            )}
          </div>
          {/* Booking Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
            <div className="flex items-center gap-2 mb-4">
              <FaTicketAlt className="text-blue-600" />
              <h2 className="text-lg font-bold text-blue-700">Booking Summary</h2>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-500" /> <span>From: <span className="font-semibold">{busData?.route?.from || "Loading..."}</span></span></div>
              <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-500" /> <span>To: <span className="font-semibold">{busData?.route?.to || "Loading..."}</span></span></div>
              <div className="flex items-center gap-2"><FaCalendarAlt className="text-blue-500" /> <span>Date: <span className="font-semibold">{journeyDate ? new Date(journeyDate).toLocaleDateString() : "Select a date"}</span></span></div>
              <div className="flex items-center gap-2"><FaBus className="text-blue-500" /> <span>{busData?.name || busData?.busNumber || "Loading bus info..."}</span></div>
              <div className="flex items-center gap-2"><FaClock className="text-blue-500" /> <span>Departure: <span className="font-semibold">{busData?.schedule?.departure || "TBD"}</span></span></div>
            </div>
            <div className="border-t my-4"></div>
            
            {/* Price details */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-gray-700 mb-2">
                <span>Ticket Price:</span>
                <span className="font-semibold"><FaRupeeSign className="inline text-xs" /> NPR {ticketPrice}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700 mb-2">
                <span>Selected Seats:</span>
                <span className="font-semibold">{selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'}</span>
              </div>
              {selectedSeats.length > 0 && (
                <div className="flex justify-between items-center text-gray-700 mb-2">
                  <span>Selected Seat Numbers:</span>
                  <span className="font-semibold">{selectedSeats.join(', ')}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between gap-2 text-blue-700 font-bold text-lg border-t pt-3">
              <span>Total Price:</span>
              <span><FaRupeeSign className="inline" /> NPR {totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BookingDetails;