"use client"

import { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// Sample data for payment transactions based on the new structure
const initialTransactions = [
  {
    paymentId: "PAY20250503A01",
    user: {
      userId: "USR002",
      fullName: "Anisha Shrestha",
      email: "anisha.shrestha@example.com",
    },
    ticket: {
      ticketId: "TKT456789",
      ticketPrice: 1300,
      seatNumber: "B3",
      yatayatName: "Greenline Yatayat",
      departure: "Kathmandu",
      destination: "Chitwan",
      departureDate: "2025-05-06",
    },
    paymentDetails: {
      method: "Khalti",
      amountPaid: 1300,
      currency: "NPR",
      paymentStatus: "Paid",
      paymentDate: "2025-05-03T15:30:00Z",
      transactionId: "KHALTI9988TX",
    },
    bookingDate: "2025-05-03T15:25:00Z",
  },
  {
    paymentId: "PAY20250503A02",
    user: {
      userId: "USR003",
      fullName: "Rajesh Yadav",
      email: "rajesh.yadav@example.com",
    },
    ticket: {
      ticketId: "TKT456790",
      ticketPrice: 1200,
      seatNumber: "A4",
      yatayatName: "Sajha Yatayat",
      departure: "Kathmandu",
      destination: "Pokhara",
      departureDate: "2025-05-07",
    },
    paymentDetails: {
      method: "eSewa",
      amountPaid: 1200,
      currency: "NPR",
      paymentStatus: "Paid",
      paymentDate: "2025-05-03T16:15:00Z",
      transactionId: "ESEWA7766TX",
    },
    bookingDate: "2025-05-03T16:10:00Z",
  },
  {
    paymentId: "PAY20250503A03",
    user: {
      userId: "USR004",
      fullName: "Sushma Rai",
      email: "sushma.rai@example.com",
    },
    ticket: {
      ticketId: "TKT456791",
      ticketPrice: 400,
      seatNumber: "C2",
      yatayatName: "Mayur Yatayat",
      departure: "Biratnagar",
      destination: "Dharan",
      departureDate: "2025-05-06",
    },
    paymentDetails: {
      method: "Cash",
      amountPaid: 400,
      currency: "NPR",
      paymentStatus: "Paid",
      paymentDate: "2025-05-03T17:00:00Z",
      transactionId: "CASH5544TX",
    },
    bookingDate: "2025-05-03T16:55:00Z",
  },
  {
    paymentId: "PAY20250504A01",
    user: {
      userId: "USR005",
      fullName: "Bikram Thapa",
      email: "bikram.thapa@example.com",
    },
    ticket: {
      ticketId: "TKT456792",
      ticketPrice: 1300,
      seatNumber: "D1",
      yatayatName: "Buddha Yatayat",
      departure: "Pokhara",
      destination: "Butwal",
      departureDate: "2025-05-08",
    },
    paymentDetails: {
      method: "Connect IPS",
      amountPaid: 1300,
      currency: "NPR",
      paymentStatus: "Refunded",
      paymentDate: "2025-05-04T09:30:00Z",
      transactionId: "CIPS3322TX",
    },
    bookingDate: "2025-05-04T09:25:00Z",
  },
  {
    paymentId: "PAY20250504A02",
    user: {
      userId: "USR006",
      fullName: "Anjali Shrestha",
      email: "anjali.shrestha@example.com",
    },
    ticket: {
      ticketId: "TKT456793",
      ticketPrice: 2500,
      seatNumber: "A1",
      yatayatName: "Deluxe Yatayat",
      departure: "Kathmandu",
      destination: "Biratnagar",
      departureDate: "2025-05-10",
    },
    paymentDetails: {
      method: "Debit Card",
      amountPaid: 2500,
      currency: "NPR",
      paymentStatus: "Paid",
      paymentDate: "2025-05-04T10:45:00Z",
      transactionId: "CARD1122TX",
    },
    bookingDate: "2025-05-04T10:40:00Z",
  },
  {
    paymentId: "PAY20250504A03",
    user: {
      userId: "USR007",
      fullName: "Naresh Maharjan",
      email: "naresh.maharjan@example.com",
    },
    ticket: {
      ticketId: "TKT456794",
      ticketPrice: 300,
      seatNumber: "B5",
      yatayatName: "Local Yatayat",
      departure: "Dharan",
      destination: "Itahari",
      departureDate: "2025-05-06",
    },
    paymentDetails: {
      method: "eSewa",
      amountPaid: 300,
      currency: "NPR",
      paymentStatus: "Paid",
      paymentDate: "2025-05-04T14:20:00Z",
      transactionId: "ESEWA9900TX",
    },
    bookingDate: "2025-05-04T14:15:00Z",
  },
  {
    paymentId: "PAY20250505A01",
    user: {
      userId: "USR008",
      fullName: "Prabin Thakuri",
      email: "prabin.thakuri@example.com",
    },
    ticket: {
      ticketId: "TKT456795",
      ticketPrice: 1600,
      seatNumber: "C3",
      yatayatName: "Sajha Yatayat",
      departure: "Kathmandu",
      destination: "Pokhara",
      departureDate: "2025-05-12",
    },
    paymentDetails: {
      method: "Khalti",
      amountPaid: 1600,
      currency: "NPR",
      paymentStatus: "Pending",
      paymentDate: "2025-05-05T08:10:00Z",
      transactionId: "KHALTI7788TX",
    },
    bookingDate: "2025-05-05T08:05:00Z",
  },
  {
    paymentId: "PAY20250505A02",
    user: {
      userId: "USR001",
      fullName: "Pralab Raj Mahat",
      email: "pralab123@gmail.com",
    },
    ticket: {
      ticketId: "TKT456796",
      ticketPrice: 1200,
      seatNumber: "A5",
      yatayatName: "Sajha Yatayat",
      departure: "Kathmandu",
      destination: "Pokhara",
      departureDate: "2025-05-05",
    },
    paymentDetails: {
      method: "Esewa",
      amountPaid: 1200,
      currency: "NPR",
      paymentStatus: "Paid",
      paymentDate: "2025-05-05T09:30:00Z",
      transactionId: "TXN998877",
    },
    bookingDate: "2025-05-03T14:22:00Z",
  },
]

// Updated chart data for NPR
const chartData = {
  daily: {
    labels: ["May 3", "May 4", "May 5"],
    datasets: [
      {
        label: "Daily Revenue",
        data: [2900, 4100, 2800],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.3,
      },
    ],
  },
  monthly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Monthly Revenue",
        data: [125000, 185000, 210000, 175000, 230000, 270000, 300000],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.3,
      },
    ],
  },
  yearly: {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Yearly Revenue",
        data: [1250000, 1850000, 1520000, 1750000, 2230000, 2700000],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.3,
      },
    ],
  },
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Revenue Overview (NPR)",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => "NPR " + value,
      },
    },
  },
}

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Helper function to format time
const formatTime = (dateString) => {
  const options = { hour: "2-digit", minute: "2-digit" }
  return new Date(dateString).toLocaleTimeString(undefined, options)
}

const Payments = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDate, setFilterDate] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "paymentDetails.paymentDate", direction: "desc" })
  const [reportPeriod, setReportPeriod] = useState("daily")
  const [summaryStats, setSummaryStats] = useState({
    totalRevenue: 0,
    completedTransactions: 0,
    pendingTransactions: 0,
    refundedTransactions: 0,
  })
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch transactions
    const fetchTransactions = () => {
      setTimeout(() => {
        setTransactions(initialTransactions)

        // Calculate summary stats
        const total = initialTransactions.reduce((sum, transaction) => {
          if (transaction.paymentDetails.paymentStatus !== "Refunded") {
            return sum + transaction.paymentDetails.amountPaid
          }
          return sum
        }, 0)

        const completed = initialTransactions.filter((t) => t.paymentDetails.paymentStatus === "Paid").length
        const pending = initialTransactions.filter((t) => t.paymentDetails.paymentStatus === "Pending").length
        const refunded = initialTransactions.filter((t) => t.paymentDetails.paymentStatus === "Refunded").length

        setSummaryStats({
          totalRevenue: total,
          completedTransactions: completed,
          pendingTransactions: pending,
          refundedTransactions: refunded,
        })

        setLoading(false)
      }, 1000)
    }

    fetchTransactions()
  }, [])

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Function to get nested property value
  const getNestedValue = (obj, path) => {
    const keys = path.split(".")
    return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj)
  }

  const sortedTransactions = [...transactions].sort((a, b) => {
    const aValue = getNestedValue(a, sortConfig.key)
    const bValue = getNestedValue(b, sortConfig.key)

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1
    }
    return 0
  })

  // Filter transactions based on search term, status, and date
  const filteredTransactions = sortedTransactions.filter((transaction) => {
    const paymentDate = new Date(transaction.paymentDetails.paymentDate).toISOString().split("T")[0]

    const matchesSearch =
      transaction.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.ticket.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.ticket.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.paymentDetails.transactionId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" ? true : transaction.paymentDetails.paymentStatus === filterStatus
    const matchesDate = filterDate ? paymentDate === filterDate : true

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment)
    setShowModal(true)
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
        <h1 className="text-2xl font-semibold text-gray-900">Payment Reports</h1>
        <div className="text-sm text-gray-500">Transaction Count: {transactions.length}</div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">NPR {summaryStats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Completed Transactions</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{summaryStats.completedTransactions}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Transactions</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{summaryStats.pendingTransactions}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Refunded Transactions</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{summaryStats.refundedTransactions}</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                reportPeriod === "daily" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300 rounded-l-md focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
              onClick={() => setReportPeriod("daily")}
            >
              Daily
            </button>
            <button
              type="button"
              className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                reportPeriod === "monthly" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-r border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
              onClick={() => setReportPeriod("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                reportPeriod === "yearly" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-r border-gray-300 rounded-r-md focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
              onClick={() => setReportPeriod("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="h-80">
          <Line options={chartOptions} data={chartData[reportPeriod]} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 pb-4">
        <div className="flex-1">
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
              placeholder="Search transactions"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-48">
          <input
            type="date"
            id="date-filter"
            name="date-filter"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <select
            id="status-filter"
            name="status-filter"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("paymentId")}
                >
                  <div className="flex items-center">
                    Payment ID
                    {sortConfig.key === "paymentId" && (
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
                  Ticket ID
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
                  onClick={() => handleSort("paymentDetails.paymentDate")}
                >
                  <div className="flex items-center">
                    Date
                    {sortConfig.key === "paymentDetails.paymentDate" && (
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
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("ticket.ticketPrice")}
                >
                  <div className="flex items-center">
                    Amount
                    {sortConfig.key === "ticket.ticketPrice" && (
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
                  Payment Method
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.paymentId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600">{transaction.paymentId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.ticket.ticketId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.user.fullName}</div>
                    <div className="text-sm text-gray-500">{transaction.user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {transaction.ticket.departure} to {transaction.ticket.destination}
                    </div>
                    <div className="text-xs text-gray-500">{transaction.ticket.yatayatName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(transaction.paymentDetails.paymentDate)}</div>
                    <div className="text-xs text-gray-500">{formatTime(transaction.paymentDetails.paymentDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      NPR {transaction.paymentDetails.amountPaid.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{transaction.paymentDetails.method}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.paymentDetails.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-800"
                          : transaction.paymentDetails.paymentStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.paymentDetails.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewPayment(transaction)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Details Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-3xl w-full mx-4 shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
                <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => setShowModal(false)}>
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payment Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Payment Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Payment ID:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedPayment.paymentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Transaction ID:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedPayment.paymentDetails.transactionId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Amount:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedPayment.paymentDetails.currency} {selectedPayment.paymentDetails.amountPaid.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Payment Method:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedPayment.paymentDetails.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Payment Date:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatDate(selectedPayment.paymentDetails.paymentDate)}{" "}
                        {formatTime(selectedPayment.paymentDetails.paymentDate)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span
                        className={`text-sm font-medium ${
                          selectedPayment.paymentDetails.paymentStatus === "Paid"
                            ? "text-green-600"
                            : selectedPayment.paymentDetails.paymentStatus === "Pending"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {selectedPayment.paymentDetails.paymentStatus}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Booking Date:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatDate(selectedPayment.bookingDate)} {formatTime(selectedPayment.bookingDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Customer ID:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedPayment.user.userId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Name:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedPayment.user.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Email:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedPayment.user.email}</span>
                    </div>
                  </div>
                </div>

                {/* Ticket Information */}
                <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                  <h4 className="font-medium text-gray-900 mb-3">Ticket Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Ticket ID:</span>
                        <span className="text-sm font-medium text-gray-900">{selectedPayment.ticket.ticketId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Bus Company:</span>
                        <span className="text-sm font-medium text-gray-900">{selectedPayment.ticket.yatayatName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Route:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedPayment.ticket.departure} to {selectedPayment.ticket.destination}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Departure Date:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedPayment.ticket.departureDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Seat Number:</span>
                        <span className="text-sm font-medium text-gray-900">{selectedPayment.ticket.seatNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Ticket Price:</span>
                        <span className="text-sm font-medium text-gray-900">
                          NPR {selectedPayment.ticket.ticketPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => window.print()}
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Payments
