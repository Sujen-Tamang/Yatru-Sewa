import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { motion } from "framer-motion"

const Dashboard = () => {
  const { currentUser } = useAuth()
  const [upcomingTrips, setUpcomingTrips] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [stats, setStats] = useState({
    totalTrips: 0,
    savedAmount: 0,
    loyaltyPoints: 0,
    favoriteRoutes: []
  })

  // Fetch data (mock data for demo)
  useEffect(() => {
    // Mock upcoming trips
    setUpcomingTrips([
      {
        id: "BK12345",
        from: "Kathmandu",
        to: "Pokhara",
        date: "2023-06-15",
        time: "08:30 AM",
        busName: "Deluxe Express",
        seatNo: "A12",
        status: "confirmed"
      },
      {
        id: "BK12346",
        from: "Pokhara",
        to: "Chitwan",
        date: "2023-07-02",
        time: "10:00 AM",
        busName: "Tourist Special",
        seatNo: "B05",
        status: "confirmed"
      }
    ])

    // Mock recent activity
    setRecentActivity([
      {
        id: "ACT1001",
        type: "booking",
        description: "Booked ticket from Kathmandu to Pokhara",
        date: "2023-05-28",
        time: "14:22"
      },
      {
        id: "ACT1002",
        type: "payment",
        description: "Payment of Rs. 2,500 for booking #BK12345",
        date: "2023-05-28",
        time: "14:25"
      },
      {
        id: "ACT1003",
        type: "profile",
        description: "Updated contact information",
        date: "2023-05-26",
        time: "09:15"
      }
    ])

    // Mock stats
    setStats({
      totalTrips: 12,
      savedAmount: 3500,
      loyaltyPoints: 450,
      favoriteRoutes: [
        { route: "Kathmandu - Pokhara", count: 5 },
        { route: "Pokhara - Chitwan", count: 3 }
      ]
    })
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {currentUser?.name || "Traveler"}!</h1>
                <p className="text-blue-100">Manage your bookings and explore new destinations</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/book" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition duration-300 inline-block transform hover:scale-105">
                  Book New Ticket
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Trips</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalTrips}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Amount Saved</p>
                <h3 className="text-2xl font-bold text-gray-900">Rs. {stats.savedAmount}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Loyalty Points</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.loyaltyPoints}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Favorite Route</p>
                <h3 className="text-lg font-bold text-gray-900 truncate max-w-[150px]">
                  {stats.favoriteRoutes[0]?.route || "None yet"}
                </h3>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Trips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Upcoming Trips</h2>
                  <Link to="/customer/bookings" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All
                  </Link>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {upcomingTrips.length > 0 ? (
                  upcomingTrips.map((trip) => (
                    <div key={trip.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center mb-2">
                            <span className="text-lg font-semibold text-gray-900">{trip.from}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <span className="text-lg font-semibold text-gray-900">{trip.to}</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {trip.date} | {trip.time}
                          </div>
                          <div className="mt-2 flex items-center">
                            <span className="text-sm text-gray-600 mr-4">{trip.busName}</span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              Seat: {trip.seatNo}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Link 
                            to={`/customer/bookings/${trip.id}`}
                            className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors text-center"
                          >
                            View Details
                          </Link>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                            Download Ticket
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No upcoming trips. Ready to plan your next journey?</p>
                    <Link to="/book" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Book a Trip
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0
                        ${activity.type === 'booking' ? 'bg-green-100 text-green-600' : 
                          activity.type === 'payment' ? 'bg-blue-100 text-blue-600' : 
                          'bg-purple-100 text-purple-600'}`}
                      >
                        {activity.type === 'booking' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                        ) : activity.type === 'payment' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.date} at {activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mt-6">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Profile</h2>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{currentUser?.name || "Demo User"}</h3>
                    <p className="text-gray-500">{currentUser?.email || "user@example.com"}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phone</span>
                    <span className="text-gray-900">+977 9812345678</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Member Since</span>
                    <span className="text-gray-900">May 2023</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to="/customer/profile" className="block w-full bg-gray-100 text-gray-800 text-center px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
