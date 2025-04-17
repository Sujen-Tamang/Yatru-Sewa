"use client"

import { useState, useEffect } from "react"

// Sample data for bookings
const initialBookings = [
  {
    id: "BK12345",
    userId: 1,
    userName: "John Doe",
    route: "New York to Boston",
    date: "2023-07-15",
    departureTime: "08:00 AM",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: 35.0,
    seatNumber: "12A",
  },
  {
    id: "BK12346",
    userId: 2,
    userName: "Jane Smith",
    route: "Washington to Philadelphia",
    date: "2023-07-15",
    departureTime: "09:30 AM",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: 28.5,
    seatNumber: "5B",
  },
  {
    id: "BK12347",
    userId: 3,
    userName: "Mike Johnson",
    route: "Boston to Washington",
    date: "2023-07-16",
    departureTime: "10:15 AM",
    status: "Pending",
    paymentStatus: "Awaiting",
    amount: 42.0,
    seatNumber: "8C",
  },
  {
    id: "BK12348",
    userId: 4,
    userName: "Sarah Williams",
    route: "Philadelphia to New York",
    date: "2023-07-16",
    departureTime: "11:00 AM",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: 25.0,
    seatNumber: "15D",
  },
  {
    id: "BK12349",
    userId: 5,
    userName: "James Brown",
    route: "New York to Washington",
    date: "2023-07-17",
    departureTime: "07:30 AM",
    status: "Pending",
    paymentStatus: "Awaiting",
    amount: 38.5,
    seatNumber: "3A",
  },
  {
    id: "BK12350",
    userId: 1,
    userName: "John Doe",
    route: "Boston to New York",
    date: "2023-07-18",
    departureTime: "09:00 AM",
    status: "Cancelled",
    paymentStatus: "Refunded",
    amount: 25.0,
    seatNumber: "7B",
  },
  {
    id: "BK12351",
    userId: 6,
    userName: "Emily Davis",
    route: "Washington to Boston",
    date: "2023-07-20",
    departureTime: "06:45 AM",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: 48.75,
    seatNumber: "10C",
  },
  {
    id: "BK12352",
    userId: 7,
    userName: "Robert Wilson",
    route: "Philadelphia to Washington",
    date: "2023-07-21",
    departureTime: "02:30 PM",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: 30.25,
    seatNumber: "9D",
  },
]

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDate, setFilterDate] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" })
  const [viewBookingDetails, setViewBookingDetails] = useState(null)

  useEffect(() => {
    // Simulate API call to fetch bookings
    const fetchBookings = () => {
      setTimeout(() => {
        setBookings(initialBookings)
        setLoading(false)
      }, 1000)
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
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1
    }
    return 0
  })

  // Filter bookings based on search term, status, and date
  const filteredBookings = sortedBookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.route.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" ? true : booking.status === filterStatus
    const matchesDate = filterDate ? booking.date === filterDate : true

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleViewBookingDetails = (booking) => {
    setViewBookingDetails(booking)
  }

  const handleUpdateStatus = (id, newStatus) => {
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status: newStatus } : booking)))

    if (viewBookingDetails && viewBookingDetails.id === id) {
      setViewBookingDetails({ ...viewBookingDetails, status: newStatus })
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
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    Booking ID
                    {sortConfig.key === "id" && (
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
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    Date/Time
                    {sortConfig.key === "date" && (
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
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center">
                    Amount
                    {sortConfig.key === "amount" && (
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
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600">{booking.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.userName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.route}</div>
                    <div className="text-xs text-gray-500">Seat: {booking.seatNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.date}</div>
                    <div className="text-xs text-gray-500">{booking.departureTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${booking.amount.toFixed(2)}
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
                      viewBookingDetails.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : viewBookingDetails.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {viewBookingDetails.status}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Booking Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Booking ID:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.id}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Customer:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.userName}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.date}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Departure:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.departureTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Route Details</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Route:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.route}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Seat Number:</span>
                        <span className="ml-2 font-medium text-gray-900">{viewBookingDetails.seatNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Amount:</span>
                        <span className="ml-2 font-medium text-gray-900">${viewBookingDetails.amount.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment Status:</span>
                        <span
                          className={`ml-2 font-medium ${
                            viewBookingDetails.paymentStatus === "Paid"
                              ? "text-green-600"
                              : viewBookingDetails.paymentStatus === "Awaiting"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {viewBookingDetails.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-3 sm:grid-flow-row-dense">
                {viewBookingDetails.status !== "Confirmed" && (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-3 sm:text-sm"
                    onClick={() => handleUpdateStatus(viewBookingDetails.id, "Confirmed")}
                  >
                    Confirm
                  </button>
                )}
                {viewBookingDetails.status !== "Cancelled" && (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:col-start-2 sm:text-sm"
                    onClick={() => handleUpdateStatus(viewBookingDetails.id, "Cancelled")}
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