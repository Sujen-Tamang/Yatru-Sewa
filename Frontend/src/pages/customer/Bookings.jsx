import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch bookings data (mock data for demo)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockBookings = [
        {
          id: "BK12345",
          from: "Kathmandu",
          to: "Pokhara",
          date: "2023-06-15",
          departureTime: "08:30 AM",
          arrivalTime: "12:30 PM",
          busName: "Deluxe Express",
          busNumber: "BA-1-2345",
          seatNo: "A12",
          passengerName: "John Doe",
          passengerPhone: "+977 9812345678",
          price: 2500,
          status: "upcoming",
          paymentStatus: "paid"
        },
        {
          id: "BK12346",
          from: "Pokhara",
          to: "Chitwan",
          date: "2023-07-02",
          departureTime: "10:00 AM",
          arrivalTime: "06:00 PM",
          busName: "Tourist Special",
          busNumber: "BA-2-3456",
          seatNo: "B05",
          passengerName: "John Doe",
          passengerPhone: "+977 9812345678",
          price: 2000,
          status: "upcoming",
          paymentStatus: "paid"
        },
        {
          id: "BK12347",
          from: "Chitwan",
          to: "Kathmandu",
          date: "2023-05-20",
          departureTime: "09:00 AM",
          arrivalTime: "05:00 PM",
          busName: "Super Deluxe",
          busNumber: "BA-3-4567",
          seatNo: "C08",
          passengerName: "John Doe",
          passengerPhone: "+977 9812345678",
          price: 2200,
          status: "completed",
          paymentStatus: "paid"
        },
        {
          id: "BK12348",
          from: "Kathmandu",
          to: "Butwal",
          date: "2023-04-15",
          departureTime: "07:00 AM",
          arrivalTime: "04:00 PM",
          busName: "Express Line",
          busNumber: "BA-4-5678",
          seatNo: "D10",
          passengerName: "John Doe",
          passengerPhone: "+977 9812345678",
          price: 1800,
          status: "completed",
          paymentStatus: "paid"
        },
        {
          id: "BK12349",
          from: "Pokhara",
          to: "Kathmandu",
          date: "2023-05-10",
          departureTime: "08:00 AM",
          arrivalTime: "12:00 PM",
          busName: "Mountain Express",
          busNumber: "BA-5-6789",
          seatNo: "E15",
          passengerName: "John Doe",
          passengerPhone: "+977 9812345678",
          price: 2500,
          status: "cancelled",
          paymentStatus: "refunded"
        }
      ]
      
      setBookings(mockBookings)
      setFilteredBookings(mockBookings)
      setLoading(false)
    }, 1000)
  }, [])

  // Filter bookings based on status
  const filterBookings = (status) => {
    setActiveFilter(status)
    
    if (status === "all") {
      setFilteredBookings(bookings)
    } else {
      const filtered = bookings.filter(booking => booking.status === status)
      setFilteredBookings(filtered)
    }
  }

  // Search bookings
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    
    if (query.trim() === "") {
      filterBookings(activeFilter)
      return
    }
    
    let filtered = bookings
    if (activeFilter !== "all") {
      filtered = bookings.filter(booking => booking.status === activeFilter)
    }
    
    filtered = filtered.filter(booking => 
      booking.id.toLowerCase().includes(query) ||
      booking.from.toLowerCase().includes(query) ||
      booking.to.toLowerCase().includes(query) ||
      booking.busName.toLowerCase().includes(query)
    )
    
    setFilteredBookings(filtered)
  }

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">View and manage all your bus bookings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => filterBookings("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === "all" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => filterBookings("upcoming")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === "upcoming" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => filterBookings("completed")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === "completed" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => filterBookings("cancelled")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === "cancelled" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  Cancelled
                </button>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600">Loading your bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings found</h3>
              <p className="text-gray-600 mb-4">
                {activeFilter === "all" 
                  ? "You haven't made any bookings yet." 
                  : `You don't have any ${activeFilter} bookings.`}
              </p>
              <Link to="/book" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Book a Trip
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="mb-4 lg:mb-0">
                      <div className="flex items-center mb-2">
                        <span className="text-lg font-semibold text-gray-900">{booking.from}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span className="text-lg font-semibold text-gray-900">{booking.to}</span>
                        <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {booking.date} | {booking.departureTime} - {booking.arrivalTime}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          {booking.busName}
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          Seat: {booking.seatNo}
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          Rs. {booking.price}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          booking.paymentStatus === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.paymentStatus === 'refunded'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link 
                        to={`/customer/bookings/${booking.id}`}
                        className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                      >
                        View Details
                      </Link>
                      
                      {booking.status === "upcoming" && (
                        <>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                            Download Ticket
                          </button>
                          <button className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                            Cancel Booking
                          </button>
                        </>
                      )}
                      
                      {booking.status === "completed" && (
                        <button className="bg-green-50 text-green-600 border border-green-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                          Write Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
        
        {/* Help Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-blue-50 border border-blue-100 rounded-xl p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need help with your booking?</h3>
              <p className="text-gray-600">Our customer support team is available 24/7 to assist you with any issues.</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/contact" className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                Contact Support
              </Link>
              <Link to="/faq" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                View FAQs
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Bookings
