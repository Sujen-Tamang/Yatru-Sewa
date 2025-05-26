"use client"

import { useState, useEffect } from "react"
import { getAllBookings } from "../../../services/adminService"

// Sample data for bookings based on the new structure
const initialBookings = [
  {
    bookingId: "BOOK123456",
    user: {
      userId: "USR001",
      fullName: "Pralab Raj Mahat",
      email: "pralab123@gmail.com",
      phone: "+9779801234567",
    },
    bus: {
      busId: "BUS789",
      yatayatName: "Sajha Yatayat",
      busNumber: "BA 2 KHA 2345",
      departure: "Kathmandu",
      destination: "Pokhara",
      departureDate: "2025-05-05",
      departureTime: "07:30 AM",
    },
    seat: {
      seatNumber: "A5",
      seatType: "Window",
    },
    payment: {
      amountPaid: 1200,
      currency: "NPR",
      paymentMethod: "Khalti",
      paymentStatus: "Completed",
      transactionId: "TXN998877",
    },
    bookingStatus: "Confirmed",
    bookedAt: "2025-05-03T14:22:00Z",
  },
  {
    bookingId: "BOOK123457",
    user: {
      userId: "USR002",
      fullName: "Sunita Gurung",
      email: "sunita.g@gmail.com",
      phone: "+9779812345678",
    },
    bus: {
      busId: "BUS456",
      yatayatName: "Nepal Yatayat",
      busNumber: "BA 3 KHA 5678",
      departure: "Pokhara",
      destination: "Lumbini",
      departureDate: "2025-05-06",
      departureTime: "08:30 AM",
    },
    seat: {
      seatNumber: "B3",
      seatType: "Aisle",
    },
    payment: {
      amountPaid: 1100,
      currency: "NPR",
      paymentMethod: "Khalti",
      paymentStatus: "Pending",
      transactionId: "TXN998878",
    },
    bookingStatus: "Pending",
    bookedAt: "2025-05-03T15:30:00Z",
  },
  {
    bookingId: "BOOK123458",
    user: {
      userId: "USR003",
      fullName: "Rajesh Yadav",
      email: "rajesh.y@gmail.com",
      phone: "+9779823456789",
    },
    bus: {
      busId: "BUS123",
      yatayatName: "Sajha Yatayat",
      busNumber: "BA 1 KHA 1234",
      departure: "Kathmandu",
      destination: "Chitwan",
      departureDate: "2025-05-07",
      departureTime: "06:45 AM",
    },
    seat: {
      seatNumber: "C7",
      seatType: "Window",
    },
    payment: {
      amountPaid: 1200,
      currency: "NPR",
      paymentMethod: "Esewa",
      paymentStatus: "Completed",
      transactionId: "TXN998879",
    },
    bookingStatus: "Confirmed",
    bookedAt: "2025-05-03T16:45:00Z",
  },
  {
    bookingId: "BOOK123459",
    user: {
      userId: "USR004",
      fullName: "Sushma Rai",
      email: "sushma.r@gmail.com",
      phone: "+9779834567890",
    },
    bus: {
      busId: "BUS234",
      yatayatName: "Makalu Yatayat",
      busNumber: "KO 1 KHA 5678",
      departure: "Biratnagar",
      destination: "Dharan",
      departureDate: "2025-05-08",
      departureTime: "10:00 AM",
    },
    seat: {
      seatNumber: "D2",
      seatType: "Aisle",
    },
    payment: {
      amountPaid: 400,
      currency: "NPR",
      paymentMethod: "Khalti",
      paymentStatus: "Completed",
      transactionId: "TXN998880",
    },
    bookingStatus: "Confirmed",
    bookedAt: "2025-05-03T17:15:00Z",
  },
  {
    bookingId: "BOOK123460",
    user: {
      userId: "USR005",
      fullName: "Bikram Thapa",
      email: "bikram.t@gmail.com",
      phone: "+9779845678901",
    },
    bus: {
      busId: "BUS345",
      yatayatName: "Lumbini Yatayat",
      busNumber: "LU 1 KHA 9012",
      departure: "Pokhara",
      destination: "Butwal",
      departureDate: "2025-05-09",
      departureTime: "02:00 PM",
    },
    seat: {
      seatNumber: "E9",
      seatType: "Window",
    },
    payment: {
      amountPaid: 1300,
      currency: "NPR",
      paymentMethod: "Khalti",
      paymentStatus: "Refunded",
      transactionId: "TXN998881",
    },
    bookingStatus: "Cancelled",
    bookedAt: "2025-05-03T18:30:00Z",
  },
  {
    bookingId: "BOOK123461",
    user: {
      userId: "USR006",
      fullName: "Anjali Shrestha",
      email: "anjali.s@gmail.com",
      phone: "+9779856789012",
    },
    bus: {
      busId: "BUS567",
      yatayatName: "Sajha Yatayat",
      busNumber: "BA 4 KHA 3456",
      departure: "Kathmandu",
      destination: "Biratnagar",
      departureDate: "2025-05-10",
      departureTime: "09:00 PM",
    },
    seat: {
      seatNumber: "F4",
      seatType: "Window",
    },
    payment: {
      amountPaid: 2500,
      currency: "NPR",
      paymentMethod: "Khalti",
      paymentStatus: "Completed",
      transactionId: "TXN998882",
    },
    bookingStatus: "Confirmed",
    bookedAt: "2025-05-03T19:45:00Z",
  },
]

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDate, setFilterDate] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "bookedAt", direction: "desc" })
  const [viewBookingDetails, setViewBookingDetails] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true)
      try {
        const response = await getAllBookings()
        if (response.success && response.data && response.data.data) {
          // Map backend data to UI structure for the table
          const mapped = response.data.data.map((b) => ({
            bookingId: b.bookingId || b._id || '-',
            user: {
              userId: b.user?._id || '-',
              fullName: b.user?.name || b.user?.fullName || '-',
              email: b.user?.email || '-',
              phone: b.user?.phone || '-',
            },
            bus: {
              busId: b.bus?._id || '-',
              yatayatName: b.bus?.yatayatName || '-',
              busNumber: b.bus?.busNumber || '-',
              departure: b.bus?.route?.from || b.bus?.departure || '-',
              destination: b.bus?.route?.to || b.bus?.destination || '-',
              departureDate: b.bus?.schedule?.departureDate || b.travelDate || b.date || '-',
              departureTime: b.bus?.schedule?.departureTime || b.bus?.departureTime || '-',
            },
            seat: {
              seatNumber: Array.isArray(b.seats) ? b.seats[0] : b.seatNumber || '-',
              seatType: b.seatType || '-',
            },
            payment: {
              amountPaid: b.amount || b.totalPrice || '-',
              currency: 'NPR',
              paymentMethod: b.paymentMethod || '-',
              paymentStatus: b.paymentStatus || '-',
              transactionId: b.transactionId || '-',
            },
            bookingStatus: b.status || b.bookingStatus || '-',
            bookedAt: b.createdAt || '-',
          }))
          setBookings(mapped)
        } else {
          setBookings([])
        }
      } catch (error) {
        setBookings([])
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const sortedBookings = [...bookings].sort((a, b) => {
    // Handle nested properties
    const getValue = (obj, path) => {
      const keys = path.split(".")
      return keys.reduce((o, k) => (o || {})[k], obj)
    }

    const aValue = getValue(a, sortConfig.key)
    const bValue = getValue(b, sortConfig.key)

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1
    }
    return 0
  })

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Format time for display
  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleTimeString(undefined, options)
  }

  // Filter bookings based on search term, status, and date
  const filteredBookings = sortedBookings.filter((booking) => {
    const matchesSearch =
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${booking.bus.departure} to ${booking.bus.destination}`.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" ? true : booking.bookingStatus === filterStatus
    const matchesDate = filterDate ? booking.bus.departureDate === filterDate : true

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleViewBookingDetails = (booking) => {
    setViewBookingDetails(booking)
  }

  const handleUpdateStatus = (id, newStatus) => {
    setBookings(
      bookings.map((booking) => (booking.bookingId === id ? { ...booking, bookingStatus: newStatus } : booking)),
    )

    if (viewBookingDetails && viewBookingDetails.bookingId === id) {
      setViewBookingDetails({ ...viewBookingDetails, bookingStatus: newStatus })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Bookings</h1>
        <div className="text-sm text-gray-500">Total Bookings: {bookings.length}</div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by ID, customer, or route"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="date-filter" className="sr-only">
            Filter by Date
          </label>
          <input
            type="date"
            id="date-filter"
            name="date-filter"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="status-filter" className="sr-only">
            Filter by Status
          </label>
          <select
            id="status-filter"
            name="status-filter"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("bookingId")}
                >
                  <div className="flex items-center">
                    Booking ID
                    {sortConfig.key === "bookingId" && (
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {sortConfig.direction === "asc" ? (
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        ) : (
                          <path
                            fillRule="evenodd"
                            d="M5.293 9.707a1 1 0 011.414 0L10 13.414l3.293-3.707a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Route
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("bus.departureDate")}
                >
                  <div className="flex items-center">
                    Date/Time
                    {sortConfig.key === "bus.departureDate" && (
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {sortConfig.direction === "asc" ? (
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        ) : (
                          <path
                            fillRule="evenodd"
                            d="M5.293 9.707a1 1 0 011.414 0L10 13.414l3.293-3.707a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("payment.amountPaid")}
                >
                  <div className="flex items-center">
                    Amount
                    {sortConfig.key === "payment.amountPaid" && (
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {sortConfig.direction === "asc" ? (
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        ) : (
                          <path
                            fillRule="evenodd"
                            d="M5.293 9.707a1 1 0 011.414 0L10 13.414l3.293-3.707a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600">{booking.bookingId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.user.fullName}</div>
                    <div className="text-xs text-gray-500">{booking.user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.bus.departure} to {booking.bus.destination}
                    </div>
                    <div className="text-xs text-gray-500">
                      {booking.bus.yatayatName} • Seat: {booking.seat.seatNumber} ({booking.seat.seatType})
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.bus.departureDate}</div>
                    <div className="text-xs text-gray-500">{booking.bus.departureTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.bookingStatus === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.bookingStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.payment.amountPaid} {booking.payment.currency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewBookingDetails(booking)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No bookings found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {viewBookingDetails && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Booking Details</h3>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      viewBookingDetails.bookingStatus === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : viewBookingDetails.bookingStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {viewBookingDetails.bookingStatus}
                  </span>
                </div>

                <div className="mt-4">
                  {/* Booking Information */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Booking Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Booking ID:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.bookingId}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Booked At:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {formatDate(viewBookingDetails.bookedAt)} {formatTime(viewBookingDetails.bookedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Name:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.user.fullName}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">User ID:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.user.userId}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Email:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.user.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Phone:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.user.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bus Information */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Bus Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Bus ID:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.bus.busId}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Yatayat:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.bus.yatayatName}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Bus Number:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.bus.busNumber}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Route:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {viewBookingDetails.bus.departure} to {viewBookingDetails.bus.destination}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.bus.departureDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Time:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.bus.departureTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seat Information */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Seat Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Seat Number:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.seat.seatNumber}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Seat Type:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.seat.seatType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Amount:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {viewBookingDetails.payment.amountPaid} {viewBookingDetails.payment.currency}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment Method:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {viewBookingDetails.payment.paymentMethod}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Transaction ID:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {viewBookingDetails.payment.transactionId}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment Status:</span>
                        <span
                          className={`ml-2 font-medium ${
                            viewBookingDetails.payment.paymentStatus === "Completed"
                              ? "text-green-600"
                              : viewBookingDetails.payment.paymentStatus === "Pending"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {viewBookingDetails.payment.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-3 sm:grid-flow-row-dense">
                {viewBookingDetails.bookingStatus !== "Confirmed" && (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-3 sm:text-sm"
                    onClick={() => handleUpdateStatus(viewBookingDetails.bookingId, "Confirmed")}
                  >
                    Confirm
                  </button>
                )}
                {viewBookingDetails.bookingStatus !== "Cancelled" && (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:col-start-2 sm:text-sm"
                    onClick={() => handleUpdateStatus(viewBookingDetails.bookingId, "Cancelled")}
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setViewBookingDetails(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bookings