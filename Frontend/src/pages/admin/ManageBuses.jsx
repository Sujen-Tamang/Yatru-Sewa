"use client";

import { useState, useEffect } from "react";
import { getAllBuses, createBus, updateBus, deleteBus } from "../../../services/adminService";
import { toast } from "react-toastify";

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    busNumber: "",
    route: {
      from: "",
      to: "",
      distance: "",
      duration: "",
      stops: [],
    },
    schedule: {
      departure: "",
      arrival: "",
      frequency: "",
    },
    totalSeats: "",
    price: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentBusId, setCurrentBusId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

  useEffect(() => {
    // Fetch buses from the backend API
    const fetchBuses = async () => {
      setLoading(true);
      try {
        const response = await getAllBuses();
        if (response.success && response.data && response.data.data) {
          console.log('Buses fetched successfully:', response.data.data);
          setBuses(response.data.data);
        } else {
          console.error('Failed to fetch buses:', response.message);
          toast.error('Failed to fetch buses');
        }
      } catch (error) {
        console.error('Error fetching buses:', error);
        toast.error('Error fetching buses');
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("route.") || name.startsWith("schedule.")) {
      const [prefix, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [prefix]: {
          ...prev[prefix],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddBus = () => {
    setFormData({
      busNumber: "",
      route: {
        from: "",
        to: "",
        distance: "",
        duration: "",
        stops: [],
      },
      schedule: {
        departure: "",
        arrival: "",
        frequency: "",
      },
      totalSeats: "",
      price: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditBus = (bus) => {
    setFormData({
      busNumber: bus.busNumber,
      route: { ...bus.route },
      schedule: { ...bus.schedule },
      totalSeats: bus.totalSeats,
      price: bus.price,
    });
    setCurrentBusId(bus._id); // Using _id as unique identifier from MongoDB
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteBus = async (busId) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      setLoading(true);
      try {
        const response = await deleteBus(busId);
        if (response.success) {
          toast.success('Bus deleted successfully');
          // Remove the deleted bus from the state
          setBuses(buses.filter((bus) => bus._id !== busId));
        } else {
          toast.error(response.message || 'Failed to delete bus');
        }
      } catch (error) {
        console.error('Error deleting bus:', error);
        toast.error('Error deleting bus');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the bus data
    const busData = {
      busNumber: formData.busNumber,
      route: {
        from: formData.route.from,
        to: formData.route.to,
        distance: parseInt(formData.route.distance, 10),
        duration: parseInt(formData.route.duration, 10),
        stops: formData.route.stops || [],
      },
      schedule: {
        departure: formData.schedule.departure,
        arrival: formData.schedule.arrival,
        frequency: formData.schedule.frequency,
      },
      totalSeats: parseInt(formData.totalSeats, 10),
      price: parseInt(formData.price, 10),
    };

    try {
      if (isEditing) {
        // Update existing bus
        const response = await updateBus(currentBusId, busData);
        if (response.success) {
          toast.success('Bus updated successfully');
          // Update the buses state with the updated bus
          setBuses(buses.map(bus => bus._id === currentBusId ? response.data.data : bus));
        } else {
          toast.error(response.message || 'Failed to update bus');
        }
      } else {
        // Add new bus
        const response = await createBus(busData);
        if (response.success) {
          toast.success('Bus added successfully');
          // Add the new bus to the buses state
          setBuses([...buses, response.data.data]);
        } else {
          toast.error(response.message || 'Failed to add bus');
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting bus data:', error);
      toast.error('Error submitting bus data');
    } finally {
      setLoading(false);
    }
  };

  // Filter buses based on search term, from, and to
  const filteredBuses = buses.filter((bus) => {
    const matchesSearch =
        bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.route.to.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFrom = filterFrom ? bus.route.from.toLowerCase().includes(filterFrom.toLowerCase()) : true;
    const matchesTo = filterTo ? bus.route.to.toLowerCase().includes(filterTo.toLowerCase()) : true;

    return matchesSearch && matchesFrom && matchesTo;
  });

  if (loading) {
    return (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Header with add button */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between items-start sm:items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Manage Buses</h1>
          <button
              onClick={handleAddBus}
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
            Add New Bus
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
                  placeholder="Search buses"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="from-filter" className="sr-only">
              Filter by From
            </label>
            <input
                type="text"
                id="from-filter"
                name="from-filter"
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Filter by From"
                value={filterFrom}
                onChange={(e) => setFilterFrom(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="to-filter" className="sr-only">
              Filter by To
            </label>
            <input
                type="text"
                id="to-filter"
                name="to-filter"
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Filter by To"
                value={filterTo}
                onChange={(e) => setFilterTo(e.target.value)}
            />
          </div>
        </div>

        {/* Buses Table */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
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
                  Route From
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Route To
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Distance (km)
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Duration (min)
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
                  Frequency
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Seats
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price ($)
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
              {filteredBuses.map((bus) => (
                  <tr key={bus._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {bus.busNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bus.route.from}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bus.route.to}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bus.route.distance}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bus.route.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bus.schedule.departure}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bus.schedule.arrival}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bus.schedule.frequency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bus.totalSeats}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bus.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                          onClick={() => handleEditBus(bus)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                          onClick={() => handleDeleteBus(bus._id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
              ))}

              {filteredBuses.length === 0 && (
                  <tr>
                    <td colSpan="11" className="px-6 py-4 text-center text-sm text-gray-500">
                      No buses found matching your criteria.
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
              ​
            </span>

                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {isEditing ? "Edit Bus" : "Add New Bus"}
                      </h3>
                      <div className="mt-4">
                        <form onSubmit={handleSubmit}>
                          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                              <label htmlFor="busNumber" className="block text-sm font-medium text-gray-700">
                                Bus Number
                              </label>
                              <div className="mt-1">
                                <input
                                    type="text"
                                    name="busNumber"
                                    id="busNumber"
                                    required
                                    placeholder="e.g. BS-4444"
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={formData.busNumber}
                                    onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="route.from" className="block text-sm font-medium text-gray-700">
                                Route From
                              </label>
                              <div className="mt-1">
                                <input
                                    type="text"
                                    name="route.from"
                                    id="route.from"
                                    required
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={formData.route.from}
                                    onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="route.to" className="block text-sm font-medium text-gray-700">
                                Route To
                              </label>
                              <div className="mt-1">
                                <input
                                    type="text"
                                    name="route.to"
                                    id="route.to"
                                    required
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={formData.route.to}
                                    onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="route.distance" className="block text-sm font-medium text-gray-700">
                                Distance (km)
                              </label>
                              <div className="mt-1">
                                <input
                                    type="number"
                                    name="route.distance"
                                    id="route.distance"
                                    required
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={formData.route.distance}
                                    onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="route.duration" className="block text-sm font-medium text-gray-700">
                                Duration (min)
                              </label>
                              <div className="mt-1">
                                <input
                                    type="number"
                                    name="route.duration"
                                    id="route.duration"
                                    required
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={formData.route.duration}
                                    onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="schedule.departure" className="block text-sm font-medium text-gray-700">
                                Departure
                              </label>
                              <div className="mt-1">
                                <input
                                    type="text"
                                    name="schedule.departure"
                                    id="schedule.departure"
                                    required
                                    placeholder="e.g. 07:30 AM"
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={formData.schedule.departure}
                                    onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="schedule.arrival" className="block text-sm font-medium text-gray-700">
                                Arrival
                              </label>
                              <div className="mt-1">
                                <input
                                    type="text"
                                    name="schedule.arrival"
                                    id="schedule.arrival"
                                    required
                                    placeholder="e.g. 12:30 PM"
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={formData.schedule.arrival}
                                    onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="schedule.frequency" className="block text-sm font-medium text-gray-700">
                                Frequency
                              </label>
                              <div className="mt-1">
                                <select
                                    name="schedule.frequency"
                                    id="schedule.frequency"
                                    required
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={formData.schedule.frequency}
                                    onChange={handleInputChange}
                                >
                                  <option value="">Select Frequency</option>
                                  <option value="daily">Daily</option>
                                  <option value="weekly">Weekly</option>
                                  <option value="monthly">Monthly</option>
                                </select>
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
                              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price ($)
                              </label>
                              <div className="mt-1">
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    required
                                    min="1"
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
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
  );
};

export default ManageBuses;