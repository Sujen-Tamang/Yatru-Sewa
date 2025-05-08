"use client"

import { useState, useEffect } from "react"

// Sample data for schedules
const initialSchedules = [
  {
    id: 1,
    routeId: 1,
    route: "Kathmandu to Pokhara",
    departureTime: "07:00 AM",
    arrivalTime: "01:30 PM",
    date: "2023-07-15",
    busNumber: "BUS-KTM-101",
    availableSeats: 5,
    totalSeats: 40,
    status: "Scheduled",
  },
  {
    id: 2,
    routeId: 1,
    route: "Kathmandu to Pokhara",
    departureTime: "09:00 AM",
    arrivalTime: "03:30 PM",
    date: "2023-07-15",
    busNumber: "GREEN-202",
    availableSeats: 0,
    totalSeats: 40,
    status: "Sold Out",
  },
  {
    id: 3,
    routeId: 2,
    route: "Pokhara to Lumbini",
    departureTime: "08:00 AM",
    arrivalTime: "12:45 PM",
    date: "2023-07-16",
    busNumber: "LUM-303",
    availableSeats: 12,
    totalSeats: 40,
    status: "Scheduled",
  },
  {
    id: 4,
    routeId: 3,
    route: "Kathmandu to Chitwan",
    departureTime: "06:30 AM",
    arrivalTime: "11:15 AM",
    date: "2023-07-15",
    busNumber: "CHIT-404",
    availableSeats: 18,
    totalSeats: 40,
    status: "Scheduled",
  },
  {
    id: 5,
    routeId: 4,
    route: "Biratnagar to Dharan",
    departureTime: "10:00 AM",
    arrivalTime: "11:30 AM",
    date: "2023-07-16",
    busNumber: "DHAR-505",
    availableSeats: 35,
    totalSeats: 40,
    status: "Scheduled",
  },
  {
    id: 6,
    routeId: 5,
    route: "Pokhara to Butwal",
    departureTime: "02:00 PM",
    arrivalTime: "06:30 PM",
    date: "2023-07-17",
    busNumber: "BUT-606",
    availableSeats: 40,
    totalSeats: 40,
    status: "Completed",
  },
]

// Sample data for routes (for dropdown)
const routeOptions = [
  { id: 1, name: "Kathmandu to Pokhara" },
  { id: 2, name: "Pokhara to Lumbini" },
  { id: 3, name: "Kathmandu to Chitwan" },
  { id: 4, name: "Biratnagar to Dharan" },
  { id: 5, name: "Pokhara to Butwal" },
  { id: 6, name: "Kathmandu to Biratnagar" },
]

const Schedules = () => {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    routeId: "",
    departureTime: "",
    arrivalTime: "",
    date: "",
    busNumber: "",
    totalSeats: 45,
    status: "Scheduled",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [currentScheduleId, setCurrentScheduleId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [filterRoute, setFilterRoute] = useState("")

  useEffect(() => {
    // Simulate API call to fetch schedules
    const fetchSchedules = () => {
      setTimeout(() => {
        setSchedules(initialSchedules)
        setLoading(false)
      }, 1000)
    }

    fetchSchedules()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddSchedule = () => {
    setFormData({
      routeId: "",
      departureTime: "",
      arrivalTime: "",
      date: "",
      busNumber: "",
      totalSeats: 45,
      status: "Scheduled",
    })
    setIsEditing(false)
    setIsModalOpen(true)
  }

  const handleEditSchedule = (schedule) => {
    setFormData({
      routeId: schedule.routeId.toString(),
      departureTime: schedule.departureTime,
      arrivalTime: schedule.arrivalTime,
      date: schedule.date,
      busNumber: schedule.busNumber,
      totalSeats: schedule.totalSeats,
      status: schedule.status,
    })
    setCurrentScheduleId(schedule.id)
    setIsEditing(true)
    setIsModalOpen(true)
  }

  const handleDeleteSchedule = (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      setSchedules(schedules.filter((schedule) => schedule.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const selectedRoute = routeOptions.find((route) => route.id.toString() === formData.routeId.toString())

    if (isEditing) {
      // Update existing schedule
      setSchedules(
        schedules.map((schedule) =>
          schedule.id === currentScheduleId
            ? {
                ...schedule,
                routeId: Number.parseInt(formData.routeId),
                route: selectedRoute ? selectedRoute.name : "",
                departureTime: formData.departureTime,
                arrivalTime: formData.arrivalTime,
                date: formData.date,
                busNumber: formData.busNumber,
                totalSeats: Number.parseInt(formData.totalSeats),
                availableSeats: Number.parseInt(formData.totalSeats), // In a real app, this would be calculated
                status: formData.status,
              }
            : schedule,
        ),
      )
    } else {
      // Add new schedule
      const newSchedule = {
        id: Math.max(...schedules.map((s) => s.id), 0) + 1,
        routeId: Number.parseInt(formData.routeId),
        route: selectedRoute ? selectedRoute.name : "",
        departureTime: formData.departureTime,
        arrivalTime: formData.arrivalTime,
        date: formData.date,
        busNumber: formData.busNumber,
        totalSeats: Number.parseInt(formData.totalSeats),
        availableSeats: Number.parseInt(formData.totalSeats), // In a real app, this would be calculated
        status: formData.status,
      }
      setSchedules([...schedules, newSchedule])
    }

    setIsModalOpen(false)
  }

  // Filter schedules based on search term, date, and route
  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch =
      schedule.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.status.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = filterDate ? schedule.date === filterDate : true
    const matchesRoute = filterRoute ? schedule.routeId.toString() === filterRoute : true

    return matchesSearch && matchesDate && matchesRoute
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
      {/* Header with add button */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Schedules</h1>
        <button
          onClick={handleAddSchedule}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Schedule
        </button>
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
              placeholder="Search schedules"
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
          <label htmlFor="route-filter" className="sr-only">
            Filter by Route
          </label>
          <select
            id="route-filter"
            name="route-filter"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={filterRoute}
            onChange={(e) => setFilterRoute(e.target.value)}
          >
            <option value="">All Routes</option>
            {routeOptions.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Schedules Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                  Departure
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Arrival
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Bus Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Available/Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
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
              {filteredSchedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule.route}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.departureTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.arrivalTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.busNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {schedule.availableSeats}/{schedule.totalSeats}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        schedule.status === "Scheduled"
                          ? "bg-green-100 text-green-800"
                          : schedule.status === "Sold Out"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditSchedule(schedule)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredSchedules.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No schedules found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
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
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {isEditing ? "Edit Schedule" : "Add New Schedule"}
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                          <label htmlFor="routeId" className="block text-sm font-medium text-gray-700">
                            Route
                          </label>
                          <div className="mt-1">
                            <select
                              id="routeId"
                              name="routeId"
                              required
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.routeId}
                              onChange={handleInputChange}
                            >
                              <option value="">Select a route</option>
                              {routeOptions.map((route) => (
                                <option key={route.id} value={route.id}>
                                  {route.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date
                          </label>
                          <div className="mt-1">
                            <input
                              type="date"
                              name="date"
                              id="date"
                              required
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.date}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="busNumber" className="block text-sm font-medium text-gray-700">
                            Bus Number
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="busNumber"
                              id="busNumber"
                              required
                              placeholder="e.g. BUS-101"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.busNumber}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700">
                            Departure Time
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="departureTime"
                              id="departureTime"
                              required
                              placeholder="e.g. 08:00 AM"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.departureTime}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700">
                            Arrival Time
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="arrivalTime"
                              id="arrivalTime"
                              required
                              placeholder="e.g. 12:30 PM"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.arrivalTime}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700">
                            Total Seats
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              name="totalSeats"
                              id="totalSeats"
                              required
                              min="1"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.totalSeats}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                          </label>
                          <div className="mt-1">
                            <select
                              id="status"
                              name="status"
                              required
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.status}
                              onChange={handleInputChange}
                            >
                              <option value="Scheduled">Scheduled</option>
                              <option value="Sold Out">Sold Out</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                        >
                          {isEditing ? "Update" : "Add"}
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Schedules