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

// Sample data for payment transactions
const initialTransactions = [
  {
    id: "TR67890",
    bookingId: "BK12345",
    userId: 1,
    userName: "John Doe",
    route: "New York to Boston",
    date: "2023-07-15",
    amount: 35.0,
    paymentMethod: "Credit Card",
    status: "Completed",
  },
  {
    id: "TR67891",
    bookingId: "BK12346",
    userId: 2,
    userName: "Jane Smith",
    route: "Washington to Philadelphia",
    date: "2023-07-15",
    amount: 28.5,
    paymentMethod: "PayPal",
    status: "Completed",
  },
  {
    id: "TR67892",
    bookingId: "BK12347",
    userId: 3,
    userName: "Mike Johnson",
    route: "Boston to Washington",
    date: "2023-07-16",
    amount: 42.0,
    paymentMethod: "Credit Card",
    status: "Pending",
  },
  {
    id: "TR67893",
    bookingId: "BK12348",
    userId: 4,
    userName: "Sarah Williams",
    route: "Philadelphia to New York",
    date: "2023-07-16",
    amount: 25.0,
    paymentMethod: "Debit Card",
    status: "Completed",
  },
  {
    id: "TR67894",
    bookingId: "BK12349",
    userId: 5,
    userName: "James Brown",
    route: "New York to Washington",
    date: "2023-07-17",
    amount: 38.5,
    paymentMethod: "PayPal",
    status: "Pending",
  },
  {
    id: "TR67895",
    bookingId: "BK12351",
    userId: 6,
    userName: "Emily Davis",
    route: "Washington to Boston",
    date: "2023-07-20",
    amount: 48.75,
    paymentMethod: "Credit Card",
    status: "Completed",
  },
  {
    id: "TR67896",
    bookingId: "BK12352",
    userId: 7,
    userName: "Robert Wilson",
    route: "Philadelphia to Washington",
    date: "2023-07-21",
    amount: 30.25,
    paymentMethod: "Debit Card",
    status: "Completed",
  },
  {
    id: "TR67897",
    bookingId: "BK12350",
    userId: 1,
    userName: "John Doe",
    route: "Boston to New York",
    date: "2023-07-18",
    amount: 25.0,
    paymentMethod: "Credit Card",
    status: "Refunded",
  },
]

// Sample data for revenue chart
const chartData = {
  daily: {
    labels: ["Jul 15", "Jul 16", "Jul 17", "Jul 18", "Jul 19", "Jul 20", "Jul 21"],
    datasets: [
      {
        label: "Daily Revenue",
        data: [63.5, 67.0, 38.5, 25.0, 0, 48.75, 30.25],
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
        data: [1250, 1850, 2100, 1750, 2300, 2700, 3000],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.3,
      },
    ],
  },
  yearly: {
    labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Yearly Revenue",
        data: [12500, 18500, 15200, 17500, 22300, 27000],
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
      text: "Revenue Overview",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => "$" + value,
      },
    },
  },
}

const Payments = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDate, setFilterDate] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" })
  const [reportPeriod, setReportPeriod] = useState("daily")
  const [summaryStats, setSummaryStats] = useState({
    totalRevenue: 0,
    completedTransactions: 0,
    pendingTransactions: 0,
    refundedTransactions: 0,
  })

  useEffect(() => {
    // Simulate API call to fetch transactions
    const fetchTransactions = () => {
      setTimeout(() => {
        setTransactions(initialTransactions)

        // Calculate summary stats
        const total = initialTransactions.reduce((sum, transaction) => {
          if (transaction.status !== "Refunded") {
            return sum + transaction.amount
          }
          return sum
        }, 0)

        const completed = initialTransactions.filter((t) => t.status === "Completed").length
        const pending = initialTransactions.filter((t) => t.status === "Pending").length
        const refunded = initialTransactions.filter((t) => t.status === "Refunded").length

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

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1
    }
    return 0
  })

  // Filter transactions based on search term, status, and date
  const filteredTransactions = sortedTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.route.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" ? true : transaction.status === filterStatus
    const matchesDate = filterDate ? transaction.date === filterDate : true

    return matchesSearch && matchesStatus && matchesDate
  })

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
          <p className="text-3xl font-bold text-gray-900 mt-2">${summaryStats.totalRevenue.toFixed(2)}</p>
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
            <option value="Completed">Completed</option>
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
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    Transaction ID
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
                  Booking ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    Date
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600">{transaction.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.bookingId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.userName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${transaction.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{transaction.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Payments