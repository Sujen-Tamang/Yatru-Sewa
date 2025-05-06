import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getAllBuses } from '../../servcies/buses'; // Corrected import path

const BusBookingPage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!from || !to) {
      setError('Please select both departure and destination');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getAllBuses();
      if (response.success) {
        // Filter buses based on route (e.g., "Kathmandu to Pokhara")
        const filteredBuses = response.data.filter(
          (bus) => bus.route.toLowerCase() === `${from.toLowerCase()} to ${to.toLowerCase()}`
        );
        setBuses(filteredBuses);
      } else {
        throw new Error(response.message || 'Failed to fetch buses');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while searching for buses.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (bus) => {
    setSelectedBus(bus);
    // Here you would typically navigate to a booking page or show a modal
    console.log('Booking bus:', bus);
    alert(`Booking initiated for ${bus.number} (${bus.route})`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Book Your Bus Ticket</h1>

      {/* Search Form */}
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
          <h2 className="text-2xl font-bold">Find Your Bus</h2>
        </div>
        <form onSubmit={handleSearch} className="p-8">
          <div className="mb-4">
            <label className="block text-gray-700">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select From</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Pokhara">Pokhara</option>
              <option value="Chitwan">Chitwan</option>
              <option value="Butwal">Butwal</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select To</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Pokhara">Pokhara</option>
              <option value="Chitwan">Chitwan</option>
              <option value="Butwal">Butwal</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search Buses'}
          </button>
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </form>
      </div>

      {/* Results Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Available Buses</h2>
        {loading ? (
          <div className="flex justify-center">
            <p className="text-gray-600">Loading buses...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{error}</p>
          </div>
        ) : buses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buses.map((bus) => (
              <motion.div
                key={bus._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800">{bus.number}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{bus.route}</span>
                    </div>
                    {bus.currentLocation && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span>Current Location: {bus.currentLocation.lat}, {bus.currentLocation.lng}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleBookNow(bus)}
                    className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4">
            <p>No buses found for this route. Please try different locations.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BusBookingPage;