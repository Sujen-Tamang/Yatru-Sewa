"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  getDashboardStats,
  getRecentBookings,
  getPopularRoutes,
} from "../../../services/adminService"

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState([])
  const [recentBookings, setRecentBookings] = useState([])
  const [popularRoutes, setPopularRoutes] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Fetch stats
        const statsRes = await getDashboardStats()
        // Fetch recent bookings
        const bookingsRes = await getRecentBookings()
        // Fetch popular routes
        const routesRes = await getPopularRoutes()

        // Map stats to UI format
        if (statsRes.success) {
          const s = statsRes.data
          setStats([
            {
              name: "Total Users",
              value: s.totalUsers?.toLocaleString() ?? "-",
              icon: "users",
              change: (s.totalUsersChange >= 0 ? "+" : "") + s.totalUsersChange + "%",
            },
            {
              name: "Active Buses",
              value: s.activeBuses?.toLocaleString() ?? "-",
              icon: "bus",
              change: (s.activeBusesChange >= 0 ? "+" : "") + s.activeBusesChange + "%",
            },
            {
              name: "Bookings Today",
              value: s.bookingsToday?.toLocaleString() ?? "-",
              icon: "ticket",
              change: (s.bookingsTodayChange >= 0 ? "+" : "") + s.bookingsTodayChange + "%",
            },
            {
              name: "Revenue (MTD)",
              value: `NPR ${s.revenueMTD?.toLocaleString() ?? "-"}`,
              icon: "money",
              change: (s.revenueMTDChange >= 0 ? "+" : "") + s.revenueMTDChange + "%",
            },
          ])
        } else {
          setStats([])
        }

        // Map bookings
        if (bookingsRes.success) {
          setRecentBookings(
            bookingsRes.data.map((b) => ({
              id: b.id,
              customer: b.customer || '-',
              route: b.route,
              date: b.date,
              status: b.status,
              amount: `NPR ${b.amount?.toLocaleString() ?? '-'}`,
            }))
          )
        } else {
          setRecentBookings([])
        }

        // Map routes
        if (routesRes.success) {
          setPopularRoutes(
            routesRes.data.map((r) => ({
              route: r.route,
              revenue: `NPR ${r.revenue?.toLocaleString() ?? '-'}`,
            }))
          )
        } else {
          setPopularRoutes([])
        }
      } catch (err) {
        setError("Failed to load dashboard data.")
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  // Icons for the stats cards
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "users":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )
      case "bus":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        )
      case "ticket":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
        )
      case "money":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      default:
        return null
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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">{renderIcon(stat.icon)}</div>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
          <Link to="/admin/bookings" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Route
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
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
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.route}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow lg:col-span-2">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
          </div>
          <div className="p-6 h-64 flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Revenue visualization would be displayed here.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Popular Routes</h2>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-200">
              {popularRoutes.map((route, index) => (
                <li key={index} className="py-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">{route.route}</span>
                    <span className="text-sm text-gray-500">{route.revenue}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard