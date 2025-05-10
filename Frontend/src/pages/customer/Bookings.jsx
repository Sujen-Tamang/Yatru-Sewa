import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaChair, FaRupeeSign, FaCreditCard, FaBus, FaSpinner } from "react-icons/fa"
import { getUserBookings, cancelBooking } from "../../../services/bookingService"
import { toast } from "react-toastify"

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancelingId, setCancelingId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => { 
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getUserBookings()
      if (res.success) {
        console.log('Bookings fetched:', res.data)
        // Check the structure of the response data
        const bookingsData = res.data.data || []
        console.log('Bookings data structure:', bookingsData)
        setBookings(bookingsData)
      } else {
        setError(res.message)
        toast.error(res.message || 'Failed to fetch bookings')
      }
    } catch (err) {
      console.error('Error fetching bookings:', err)
      setError('An unexpected error occurred')
      toast.error('Failed to fetch your bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id) => {
    if (!id) {
      toast.error('Invalid booking ID')
      return
    }
    
    setCancelingId(id)
    try {
      console.log('Attempting to cancel booking with ID:', id)
      const res = await cancelBooking(id)
      console.log('Cancel booking response:', res)
      if (res.success) {
        toast.success('Booking cancelled successfully')
        fetchBookings()
      } else {
        toast.error(res.message || 'Failed to cancel booking')
      }
    } catch (err) {
      console.error('Error cancelling booking:', err)
      toast.error('An error occurred while cancelling your booking')
    } finally {
      setCancelingId(null)
    }
  }

  // Sort bookings by date (most recent first)
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.travelDate || a.date || 0)
    const dateB = new Date(b.travelDate || b.date || 0)
    return dateB - dateA
  })

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
          <div className="flex justify-between items-center px-6 py-3">
            <h2 className="text-lg font-medium text-gray-800">All Bookings</h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
            </span>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-12 text-gray-500 flex flex-col items-center">
            <FaSpinner className="animate-spin text-blue-600 text-3xl mb-3" />
            <p>Loading your bookings...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : sortedBookings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No bookings found.</div>
        ) : (
          <div className="space-y-8">
            {sortedBookings.map((b) => (
              <motion.div
                key={b._id || b.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow border border-gray-200 p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FaBus className="text-blue-600" />
                      <span className="text-xl font-bold text-blue-700">{b.bus?.busNumber || 'Bus'}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">Booking ID: {b.bookingId || b._id}</div>
                    <div className="flex flex-wrap gap-4 text-gray-700 text-sm mb-2">
                      <div className="flex items-center gap-1"><FaMapMarkerAlt /> Route: <span className="font-semibold">{b.bus?.route?.from && b.bus?.route?.to ? `${b.bus.route.from} to ${b.bus.route.to}` : (b.route || 'N/A')}</span></div>
                      <div className="flex items-center gap-1"><FaCalendarAlt /> Date: <span className="font-semibold">{new Date(b.travelDate || b.date).toLocaleDateString()}</span></div>
                      <div className="flex items-center gap-1"><FaClock /> Departure: <span className="font-semibold">{b.bus?.schedule?.departureTime || b.departureTime || 'N/A'}</span></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[180px]">
                    <div className="flex items-center gap-1"><FaChair /> Seats: <span className="font-semibold">{Array.isArray(b.seats) ? b.seats.join(', ') : (b.seatNumber || 'N/A')}</span></div>
                    <div className="flex items-center gap-1"><FaRupeeSign /> Price: <span className="font-semibold">NPR {b.totalPrice || b.amount || 0}</span></div>
                    <div className="flex items-center gap-1"><FaCreditCard /> Payment: <span className="font-semibold">{b.payment ? 'Paid' : (b.paymentStatus || 'Pending')}</span></div>
                  </div>
                  <div className="flex flex-col gap-2 items-end min-w-[160px]">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${b.status === 'Confirmed' || b.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : b.status === 'Cancelled' || b.status === 'Canceled' || b.status === 'cancelled' || b.status === 'canceled' ? 'bg-red-100 text-red-700' : b.status === 'Pending' || b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{b.status}</span>
                    <div className="flex gap-2 mt-2">
                      <button className="px-4 py-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-sm flex items-center gap-1">
                        <span role="img" aria-label="ticket">🎫</span> View E-Ticket
                      </button>
                      {/* Only show cancel button for confirmed bookings as per backend requirement */}
                      {(b.status === 'Confirmed' || b.status === 'Pending') && (
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm flex items-center gap-1"
                          onClick={() => {
                            // Log the booking object to see all available properties
                            console.log('Booking to cancel:', b);
                            // Use the correct ID field based on what's available
                            const bookingId = b._id || b.id;
                            console.log('Using booking ID for cancellation:', bookingId);
                            handleCancel(bookingId);
                          }}
                          disabled={cancelingId === (b._id || b.id)}
                        >
                          {cancelingId === (b._id || b.id) ? 'Canceling...' : (<><span role="img" aria-label="cancel">❌</span> Cancel Booking</>)}
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
