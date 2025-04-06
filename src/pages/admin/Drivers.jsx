"use client"

import { useState, useEffect } from "react"

// Sample data for drivers
const initialDrivers = [
  {
    id: 1,
    name: "Ram thapa",
    email: "ram.thapa@bustracker.com",
    phone: "+1 (123) 456-7890",
    licenseNumber: "DL-123456",
    experience: "5 years",
    joinDate: "2020-03-15",
    status: "Active",
    assignedBus: "BUS-101",
    rating: 4.8,
  },
  {
    id: 2,
    name: "sita shrestha",
    email: "sita.shrestha@bustracker.com",
    phone: "+1 (234) 567-8901",
    licenseNumber: "DL-234567",
    experience: "8 years",
    joinDate: "2018-06-22",
    status: "Active",
    assignedBus: "BUS-102",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Hari pakheral",
    email: "hari.pokhrel@bustracker.com",
    phone: "+1 (345) 678-9012",
    licenseNumber: "DL-345678",
    experience: "3 years",
    joinDate: "2021-01-10",
    status: "Active",
    assignedBus: "BUS-103",
    rating: 4.5,
  },
  {
    id: 4,
    name: "geeta magar",
    email: "geeta.mag@bustracker.com",
    phone: "+1 (456) 789-0123",
    licenseNumber: "DL-456789",
    experience: "6 years",
    joinDate: "2019-09-05",
    status: "Inactive",
    assignedBus: "BUS-104",
    rating: 4.7,
  },
  {
    id: 5,
    name: "shyam KC",
    email: "shyam.kc@bustracker.com",
    phone: "+1 (567) 890-1234",
    licenseNumber: "DL-567890",
    experience: "10 years",
    joinDate: "2016-11-18",
    status: "Active",
    assignedBus: "BUS-105",
    rating: 4.9,
  },
  {
    id: 6,
    name: "anjan rai",
    email: "anjana.rai@bustracker.com",
    phone: "+1 (678) 901-2345",
    licenseNumber: "DL-678901",
    experience: "4 years",
    joinDate: "2020-07-30",
    status: "Active",
    assignedBus: "BUS-106",
    rating: 4.6,
  },
];

const Drivers = () => {
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortConfig, setSortConfig] = useState({ key: "joinDate", direction: "desc" })
  const [viewDriverDetails, setViewDriverDetails] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
    experience: "",
    assignedBus: "",
    status: "Active",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [currentDriverId, setCurrentDriverId] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState(null)

  useEffect(() => {
    // Simulate API call to fetch drivers
    const fetchDrivers = () => {
      setTimeout(() => {
        setDrivers(initialDrivers)
        setLoading(false)
      }, 1000)
    }

    fetchDrivers()
  }, [])

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const sortedDrivers = [...drivers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1
    }
    return 0
  })

  // Filter drivers based on search term and status
  const filteredDrivers = sortedDrivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm) ||
      driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.assignedBus.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterStatus === "all") return matchesSearch
    return matchesSearch && driver.status === filterStatus
  })

  const handleViewDriverDetails = (driver) => {
    setViewDriverDetails(driver)
  }

  const handleToggleStatus = (id) => {
    setDrivers(
      drivers.map((driver) =>
        driver.id === id ? { ...driver, status: driver.status === "Active" ? "Inactive" : "Active" } : driver,
      ),
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddDriver = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      licenseNumber: "",
      experience: "",
      assignedBus: "",
      status: "Active",
    })
    setIsEditing(false)
    setIsModalOpen(true)
  }

  const handleEditDriver = (driver) => {
    setFormData({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      licenseNumber: driver.licenseNumber,
      experience: driver.experience,
      assignedBus: driver.assignedBus,
      status: driver.status,
    })
    setCurrentDriverId(driver.id)
    setIsEditing(true)
    setIsModalOpen(true)
  }

  const handleDeleteDriver = (id) => {
    setDeleteConfirmation(id)
  }

  const confirmDelete = () => {
    setDrivers(drivers.filter((driver) => driver.id !== deleteConfirmation))
    setDeleteConfirmation(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEditing) {
      // Update existing driver
      setDrivers(
        drivers.map((driver) =>
          driver.id === currentDriverId
            ? {
                ...driver,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                licenseNumber: formData.licenseNumber,
                experience: formData.experience,
                assignedBus: formData.assignedBus,
                status: formData.status,
              }
            : driver,
        ),
      )
    } else {
      // Add new driver
      const newDriver = {
        id: Math.max(...drivers.map((d) => d.id), 0) + 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        licenseNumber: formData.licenseNumber,
        experience: formData.experience,
        assignedBus: formData.assignedBus,
        status: formData.status,
        joinDate: new Date().toISOString().split("T")[0],
        rating: 0,
      }
      setDrivers([...drivers, newDriver])
    }

    setIsModalOpen(false)
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
      {/* Header with add button */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Drivers</h1>
        <button
          onClick={handleAddDriver}
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
          Add New Driver
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
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
              placeholder="Search by name, email, phone, license or bus"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-48">
          <select
            id="filter"
            name="filter"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Drivers</option>
            <option value="Active">Active Only</option>
            <option value="Inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Drivers Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name
                    {sortConfig.key === "name" && (
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
                  Contact Info
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  License Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Experience
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Bus
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
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{driver.email}</div>
                    <div className="text-sm text-gray-500">{driver.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{driver.licenseNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{driver.experience}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{driver.assignedBus}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        driver.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDriverDetails(driver)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditDriver(driver)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(driver.id)}
                      className={`${
                        driver.status === "Active"
                          ? "text-yellow-600 hover:text-yellow-900"
                          : "text-green-600 hover:text-green-900"
                      } mr-4`}
                    >
                      {driver.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => handleDeleteDriver(driver.id)} className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredDrivers.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No drivers found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Driver Details Modal */}
      {viewDriverDetails && (
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Driver Details</h3>
                  <div className="mt-4">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">
                          {viewDriverDetails.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">{viewDriverDetails.name}</h4>
                        <p
                          className={`text-sm ${viewDriverDetails.status === "Active" ? "text-green-600" : "text-red-600"}`}
                        >
                          {viewDriverDetails.status}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h5 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h5>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          <span className="text-sm text-gray-600">{viewDriverDetails.email}</span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <span className="text-sm text-gray-600">{viewDriverDetails.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h5 className="text-sm font-medium text-gray-500 mb-2">Driver Information</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">License Number:</span>
                          <span className="ml-2 font-medium text-gray-900">{viewDriverDetails.licenseNumber}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Experience:</span>
                          <span className="ml-2 font-medium text-gray-900">{viewDriverDetails.experience}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Assigned Bus:</span>
                          <span className="ml-2 font-medium text-gray-900">{viewDriverDetails.assignedBus}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Join Date:</span>
                          <span className="ml-2 font-medium text-gray-900">{viewDriverDetails.joinDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Rating:</span>
                          <span className="ml-2 font-medium text-gray-900">{viewDriverDetails.rating} / 5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setViewDriverDetails(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Driver Modal */}
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
                    {isEditing ? "Edit Driver" : "Add New Driver"}
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              required
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <div className="mt-1">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              required
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="phone"
                              id="phone"
                              required
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                            License Number
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="licenseNumber"
                              id="licenseNumber"
                              required
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.licenseNumber}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                            Experience
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="experience"
                              id="experience"
                              required
                              placeholder="e.g. 5 years"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.experience}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="assignedBus" className="block text-sm font-medium text-gray-700">
                            Assigned Bus
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="assignedBus"
                              id="assignedBus"
                              required
                              placeholder="e.g. BUS-101"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.assignedBus}
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
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Driver</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this driver? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setDeleteConfirmation(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Drivers