"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBus,
  FaClock,
  FaRupeeSign,
  FaChair,
} from "react-icons/fa";
import {
  getAllBuses,
  getAvailableSeats,
  bookBusSeats,
} from "../../services/busService";

const BusBookingPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [sortBy, setSortBy] = useState("departureTime");
  const [filterBusType, setFilterBusType] = useState("");
  const [availableSeatsData, setAvailableSeatsData] = useState(null);

  // List of all available locations
  const allLocations = [
    "Kathmandu",
    "Pokhara",
    "Chitwan",
    "Butwal",
    "Biratnagar",
    "Dharan",
    "Birgunj",
    "Nepalgunj",
  ];

  // Get available "To" locations based on selected "From"
  const getAvailableToLocations = () => {
    return from
      ? allLocations.filter((location) => location !== from)
      : allLocations;
  };

  // Get available "From" locations based on selected "To"
  const getAvailableFromLocations = () => {
    return to
      ? allLocations.filter((location) => location !== to)
      : allLocations;
  };

  // Set current date as default
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!from || !to || !date) {
      setError("Please select departure, destination, and date");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getAllBuses();
      if (response.success) {
        // Filter buses based on route
        const filteredBuses = response.data.filter(
          (bus) =>
            bus.from.toLowerCase() === from.toLowerCase() &&
            bus.to.toLowerCase() === to.toLowerCase()
        );

        // Sort buses based on selected criteria
        const sortedBuses = sortBuses(filteredBuses, sortBy);

        // Apply bus type filter if selected
        const finalBuses = filterBusType
          ? sortedBuses.filter((bus) => bus.busType === filterBusType)
          : sortedBuses;

        setBuses(finalBuses);

        if (finalBuses.length === 0) {
          setError(
            `No buses found for ${from} to ${to} on ${formatDate(date)}`
          );
        }
      } else {
        throw new Error(response.message || "Failed to fetch buses");
      }
    } catch (err) {
      setError(err.message || "An error occurred while searching for buses.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sortBuses = (busList, criterion) => {
    return [...busList].sort((a, b) => {
      switch (criterion) {
        case "price":
          return a.price - b.price;
        case "departureTime":
          return (
            convertTimeToMinutes(a.departureTime) -
            convertTimeToMinutes(b.departureTime)
          );
        case "availableSeats":
          return b.availableSeats - a.availableSeats;
        default:
          return 0;
      }
    });
  };

  const convertTimeToMinutes = (timeString) => {
    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleBookNow = async (bus) => {
    setSelectedBus(bus);
    setShowSeatSelection(true);
    setSelectedSeats([]);

    try {
      const seatsResponse = await getAvailableSeats(bus._id, date);
      if (seatsResponse.success) {
        setAvailableSeatsData(seatsResponse.data);
      } else {
        setError(seatsResponse.message || "Failed to fetch available seats");
      }
    } catch (err) {
      setError("Error fetching available seats. Please try again.");
      console.error(err);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else if (selectedSeats.length < 4) {
      // Limit to 4 seats per booking
      setSelectedSeats([...selectedSeats, seatNumber]);
    } else {
      alert("You can only select up to 4 seats per booking");
    }
  };

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    try {
      const bookingData = {
        busId: selectedBus._id,
        seats: selectedSeats,
        journeyDate: date,
        // Add any additional user data required by your backend
      };

      const bookingResponse = await bookBusSeats(
        selectedBus._id,
        selectedSeats,
        bookingData
      );

      if (bookingResponse.success) {
        alert(`Booking confirmed!
Booking ID: ${bookingResponse.data.bookingId}
Bus: ${selectedBus.busName} - ${selectedBus.busNumber}
Route: ${selectedBus.from} to ${selectedBus.to}
Date: ${formatDate(date)}
Seats: ${selectedSeats.join(", ")}
Total: NPR ${selectedSeats.length * selectedBus.price}`);

        setShowSeatSelection(false);
        setSelectedBus(null);
        setSelectedSeats([]);
      } else {
        alert(`Booking failed: ${bookingResponse.message}`);
      }
    } catch (err) {
      console.error("Error during booking:", err);
      alert("An error occurred during booking. Please try again.");
    }
  };

  const renderSeatMap = () => {
    // Generate a 4x8 seat map
    const rows = 8;
    const cols = 4;
    const seatMap = [];

    // Use the bookedSeats from API if available, otherwise use random logic
    const bookedSeats = availableSeatsData?.bookedSeats || [];

    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let col = 1; col <= cols; col++) {
        const seatLetter = String.fromCharCode(64 + col); // A, B, C, D
        const seatId = `${row}${seatLetter}`;
        const isBooked = bookedSeats.includes(seatId);
        const isSelected = selectedSeats.includes(seatId);

        rowSeats.push(
          <div
            key={seatId}
            className={`seat ${isBooked ? "booked" : ""} ${
              isSelected ? "selected" : ""
            }`}
            onClick={() => !isBooked && handleSeatClick(seatId)}
          >
            {seatId}
          </div>
        );
      }
      seatMap.push(
        <div key={`row-${row}`} className="seat-row">
          {rowSeats}
        </div>
      );
    }

    return seatMap;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 pb-16"
    >
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Book Your Bus Ticket
      </h1>

      {showSeatSelection && selectedBus ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
            <h2 className="text-2xl font-bold">Select Your Seats</h2>
            <p className="text-sm mt-1">
              {selectedBus.busName} - {selectedBus.busNumber}
            </p>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Bus Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="mb-2">
                      <span className="font-medium">Route:</span>{" "}
                      {selectedBus.from} to {selectedBus.to}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Date:</span>{" "}
                      {formatDate(date)}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Departure:</span>{" "}
                      {selectedBus.departureTime}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Arrival:</span>{" "}
                      {selectedBus.arrivalTime}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Bus Type:</span>{" "}
                      {selectedBus.busType}
                    </p>
                    <p>
                      <span className="font-medium">Amenities:</span>{" "}
                      {selectedBus.amenities.join(", ")}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Seat Selection</h3>
                  <div className="mb-4">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-200 border border-gray-300 rounded mr-2"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-red-200 border border-red-300 rounded mr-2"></div>
                        <span>Booked</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-green-500 border border-green-600 rounded mr-2"></div>
                        <span>Selected</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      You can select up to 4 seats per booking
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="bus-layout">
                  <div className="driver-area mb-4 bg-gray-200 p-2 rounded text-center">
                    Driver
                  </div>
                  <div className="seats-container">{renderSeatMap()}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <p className="font-medium">
                    Selected Seats:{" "}
                    {selectedSeats.length > 0
                      ? selectedSeats.join(", ")
                      : "None"}
                  </p>
                  <p className="text-lg font-bold mt-1">
                    Total: NPR {selectedSeats.length * selectedBus.price}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-3">
                  <button
                    onClick={() => setShowSeatSelection(false)}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  >
                    Back to Results
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    disabled={selectedSeats.length === 0}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
              <h2 className="text-2xl font-bold">Find Your Bus</h2>
              <p className="text-sm mt-1">
                Search for buses between cities in Nepal
              </p>
            </div>
            <form onSubmit={handleSearch} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1 text-blue-600" />
                      From
                    </div>
                  </label>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>Select Departure</option>
                    {getAvailableFromLocations().map((location) => (
                      <option key={`from-${location}`} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1 text-blue-600" />
                      To
                    </div>
                  </label>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {getAvailableToLocations().map((location) => (
                      <option key={`to-${location}`} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1 text-blue-600" />
                      Date
                    </div>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Searching...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FaBus className="mr-2" />
                        Search Buses
                      </span>
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                  <p>{error}</p>
                </div>
              )}
            </form>
          </div>

          {/* Results Section */}
          {buses.length > 0 && (
            <div className="mt-8 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-blue-700 mb-2">
                Available Buses
              </h2>
              <div className="text-gray-600 mb-6">
                Showing results for{" "}
                <span className="font-semibold text-blue-800">{from}</span> to{" "}
                <span className="font-semibold text-blue-800">{to}</span> on{" "}
                <span className="font-semibold text-blue-800">{date}</span>
              </div>
              <div className="space-y-6">
                {buses.map((bus) => (
                  <div
                    key={bus._id}
                    className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-2">
                        <FaBus className="text-blue-500 mr-2" />
                        <span className="text-lg font-bold text-blue-700 mr-2 truncate">
                          {bus.busName}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-700 text-sm mb-2">
                        <div className="flex items-center mr-4">
                          <FaClock className="mr-1 text-gray-400" />
                          <span>
                            Departure:{" "}
                            <span className="font-semibold text-black">
                              {bus.departureTime}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaClock className="mr-1 text-gray-400" />
                          <span>
                            Arrival:{" "}
                            <span className="font-semibold text-black">
                              {bus.arrivalTime}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
                      <div className="flex items-center gap-6 mb-2">
                        <div className="flex items-center text-gray-700">
                          <FaRupeeSign className="mr-1 text-blue-500" />
                          <span className="font-semibold text-black">
                            Price: NPR {bus.price}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="mr-1">👥</span>
                          <span>
                            Seats Available:{" "}
                            <span
                              className={`font-semibold ${
                                bus.availableSeats > 5
                                  ? "text-green-600"
                                  : "text-red-500"
                              }`}
                            >
                              {bus.availableSeats} seats
                            </span>
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleBookNow(bus)}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded transition-colors shadow-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .bus-layout {
          width: 100%;
        }
        .seats-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .seat-row {
          display: flex;
          justify-content: space-between;
        }
        .seat {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .seat:hover:not(.booked) {
          background-color: #e5e7eb;
        }
        .seat.booked {
          background-color: #fecaca;
          border-color: #f87171;
          cursor: not-allowed;
          color: #991b1b;
        }
        .seat.selected {
          background-color: #22c55e;
          border-color: #16a34a;
          color: white;
        }
      `}</style>
    </motion.div>
  );
};

export default BusBookingPage;
