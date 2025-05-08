import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaChair, FaRupeeSign, FaCreditCard, FaBus } from "react-icons/fa"
import { getUserBookings, cancelBooking } from "../../../services/bookingService"

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("upcoming")
  const [cancelingId, setCancelingId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => { 
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    setError(null)
    const res = await getUserBookings()
    if (res.success) {
      setBookings(res.data)
    } else {
      setError(res.message)
    }
    setLoading(false)
  }

  const handleCancel = async (id) => {
    setCancelingId(id)
    const res = await cancelBooking(id)
    if (res.success) {
      fetchBookings()
    } else {
      alert(res.message)
    }
    setCancelingId(null)
  }

  // Helper to check if a booking is in the past
  const isPast = (booking) => {
    const today = new Date().setHours(0,0,0,0)
    const bookingDate = new Date(booking.date).setHours(0,0,0,0)
    return bookingDate < today || booking.status.toLowerCase() === 'completed' || booking.status.toLowerCase() === 'canceled'
  }

  const filteredBookings = bookings.filter(b =>
    activeTab === "upcoming" ? !isPast(b) && b.status.toLowerCase() !== 'canceled' : isPast(b)
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-2"
        >
          <span>🚌</span> My Bookings
        </motion.h1>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8">
          <div className="flex">
            <button
              className={`flex-1 py-3 text-lg font-medium transition-colors border-b-2 ${activeTab === "upcoming" ? "border-blue-600 text-blue-700 bg-blue-50" : "border-transparent text-gray-500 bg-white"}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Trips
            </button>
            <button
              className={`flex-1 py-3 text-lg font-medium transition-colors border-b-2 ${activeTab === "past" ? "border-blue-600 text-blue-700 bg-blue-50" : "border-transparent text-gray-500 bg-white"}`}
              onClick={() => setActiveTab("past")}
            >
              Past Trips
            </button>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading bookings...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No bookings found.</div>
        ) : (
          <div className="space-y-8">
            {filteredBookings.map((b) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow border border-gray-200 p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FaBus className="text-blue-600" />
                      <span className="text-xl font-bold text-blue-700">{b.busName || b.route?.split(' ')[0] || 'Bus'}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">Booking ID: {b.id}</div>
                    <div className="flex flex-wrap gap-4 text-gray-700 text-sm mb-2">
                      <div className="flex items-center gap-1"><FaMapMarkerAlt /> Route: <span className="font-semibold">{b.route}</span></div>
                      <div className="flex items-center gap-1"><FaCalendarAlt /> Date: <span className="font-semibold">{b.date}</span></div>
                      <div className="flex items-center gap-1"><FaClock /> Departure: <span className="font-semibold">{b.departureTime}</span></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[180px]">
                    <div className="flex items-center gap-1"><FaChair /> Seat: <span className="font-semibold">{b.seatNumber}</span></div>
                    <div className="flex items-center gap-1"><FaRupeeSign /> Price: <span className="font-semibold">NPR {b.amount}</span></div>
                    <div className="flex items-center gap-1"><FaCreditCard /> Payment: <span className="font-semibold">{b.paymentStatus}</span></div>
                  </div>
                  <div className="flex flex-col gap-2 items-end min-w-[160px]">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${b.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' : b.status === 'Canceled' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{b.status}</span>
                    <div className="flex gap-2 mt-2">
                      <button className="px-4 py-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-sm flex items-center gap-1">
                        <span role="img" aria-label="ticket">🎫</span> View E-Ticket
                      </button>
                      {b.status === 'Confirmed' && activeTab === 'upcoming' && (
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm flex items-center gap-1"
                          onClick={() => handleCancel(b.id)}
                          disabled={cancelingId === b.id}
                        >
                          {cancelingId === b.id ? 'Canceling...' : (<><span role="img" aria-label="cancel">❌</span> Cancel Booking</>)}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Bookings
