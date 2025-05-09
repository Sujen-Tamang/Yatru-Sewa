"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBus,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";
import { getAllBuses } from "../../services/busService";

const BusBookingPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [allBuses, setAllBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("departureTime");
  const [sortedBuses, setSortedBuses] = useState([]);

  const navigate = useNavigate();

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

  const getAvailableToLocations = () => {
    return from
      ? allLocations.filter((location) => location !== from)
      : allLocations;
  };

  const getAvailableFromLocations = () => {
    return to
      ? allLocations.filter((location) => location !== to)
      : allLocations;
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  // Fetch all buses on component mount
  useEffect(() => {
    const fetchAllBuses = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getAllBuses();
        if (response.success) {
          setAllBuses(response.data || []);
        } else {
          throw new Error(response.message || "Failed to fetch buses");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching buses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBuses();
  }, []);

  // Filter and sort buses for display
  useEffect(() => {
    let filteredBuses = [...allBuses];
    
    if (from) {
      filteredBuses = filteredBuses.filter(
        bus => bus.route?.from?.toLowerCase() === from.toLowerCase()
      );
    }
    
    if (to) {
      filteredBuses = filteredBuses.filter(
        bus => bus.route?.to?.toLowerCase() === to.toLowerCase()
      );
    }
    
    setSortedBuses(sortBuses(filteredBuses, sortBy));
  }, [allBuses, from, to, date, sortBy]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (sortedBuses.length === 0) {
      let errorMessage = "No buses found";
      if (from && to) {
        errorMessage = `No buses found for ${from} to ${to}`;
        if (date) {
          errorMessage += ` on ${formatDate(date)}`;
        }
      }
      setError(errorMessage);
    }
  };

  const sortBuses = (busList, criterion) => {
    return [...busList].sort((a, b) => {
      switch (criterion) {
        case "price":
          return a.price - b.price;
        case "departureTime":
          return (
            convertTimeToMinutes(a.schedule.departure) -
            convertTimeToMinutes(b.schedule.departure)
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

  const handleBookNow = (bus) => {
    navigate(`/customer/bookings/details`, { state: { bus, journeyDate: date } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 pb-16"
    >
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Find Your Bus
      </h1>

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
                <option value="" disabled>
                  Select Departure
                </option>
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
                <option value="" disabled>
                  Select Destination
                </option>
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
      {sortedBuses.length > 0 && (
        <div className="mt-8 max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-700">
              Available Buses
            </h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="departureTime">Sort by Departure Time</option>
              <option value="price">Sort by Price</option>
              <option value="availableSeats">Sort by Available Seats</option>
            </select>
          </div>
          <div className="text-gray-600 mb-6">
            Showing results for{" "}
            <span className="font-semibold text-blue-800">{from}</span> to{" "}
            <span className="font-semibold text-blue-800">{to}</span> on{" "}
            <span className="font-semibold text-blue-800">{date}</span>
          </div>
          <div className="space-y-6">
            {sortedBuses.map((bus) => (
              <div
                key={bus.id}
                className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-2">
                    <FaBus className="text-blue-500 mr-2" />
                    <span className="text-lg font-bold text-blue-700 mr-2 truncate">
                      {bus.busNumber}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-700 text-sm mb-2">
                    <div className="flex items-center mr-4">
                      <FaClock className="mr-1 text-gray-400" />
                      <span>
                        Departure:{" "}
                        <span className="font-semibold text-black">
                          {bus.schedule.departure}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-1 text-gray-400" />
                      <span>
                        Arrival:{" "}
                        <span className="font-semibold text-black">
                          {bus.schedule.arrival}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Route:</span> {bus.route.from} to {bus.route.to}
                    <span className="mx-2">•</span>
                    <span className="font-medium">Distance:</span> {bus.route.distance} km
                    <span className="mx-2">•</span>
                    <span className="font-medium">Duration:</span> {Math.floor(bus.route.duration / 60)}h {bus.route.duration % 60}m
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
      {!loading && sortedBuses.length === 0 && (
        <div className="mt-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p>No buses found for {from} to {to} on {formatDate(date)}</p>
        </div>
      )}
    </motion.div>
  );
};

export default BusBookingPage;