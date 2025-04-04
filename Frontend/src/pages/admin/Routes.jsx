"use client";

import { useState, useEffect } from "react";

// Sample data for routes
const initialRoutes = [
  {
    id: 1,
    from: "New York",
    to: "Boston",
    distance: "215 miles",
    duration: "4h 30m",
    price: 25,
    active: true,
  },
  {
    id: 2,
    from: "Boston",
    to: "Washington DC",
    distance: "440 miles",
    duration: "8h 15m",
    price: 35,
    active: true,
  },
  {
    id: 3,
    from: "Philadelphia",
    to: "New York",
    distance: "95 miles",
    duration: "2h 45m",
    price: 20,
    active: true,
  },
  {
    id: 4,
    from: "Washington DC",
    to: "Philadelphia",
    distance: "140 miles",
    duration: "3h 00m",
    price: 22,
    active: true,
  },
  {
    id: 5,
    from: "Boston",
    to: "New York",
    distance: "215 miles",
    duration: "4h 30m",
    price: 25,
    active: true,
  },
  {
    id: 6,
    from: "New York",
    to: "Washington DC",
    distance: "230 miles",
    duration: "4h 45m",
    price: 30,
    active: false,
  },
];

const Routes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    distance: "",
    duration: "",
    price: "",
    active: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentRouteId, setCurrentRouteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState("all");

  useEffect(() => {
    // Simulate API call to fetch routes
    const fetchRoutes = () => {
      setTimeout(() => {
        setRoutes(initialRoutes);
        setLoading(false);
      }, 1000);
    };

    fetchRoutes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddRoute = () => {
    setFormData({
      from: "",
      to: "",
      distance: "",
      duration: "",
      price: "",
      active: true,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditRoute = (route) => {
    setFormData({
      from: route.from,
      to: route.to,
      distance: route.distance,
      duration: route.duration,
      price: route.price,
      active: route.active,
    });
    setCurrentRouteId(route.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteRoute = (id) => {
    if (window.confirm("Are you sure you want to delete this route?")) {
      setRoutes(routes.filter((route) => route.id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setRoutes(
      routes.map((route) =>
        route.id === id ? { ...route, active: !route.active } : route
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing route
      setRoutes(
        routes.map((route) =>
          route.id === currentRouteId
            ? {
                ...route,
                from: formData.from,
                to: formData.to,
                distance: formData.distance,
                duration: formData.duration,
                price: Number(formData.price),
                active: formData.active,
              }
            : route
        )
      );
    } else {
      // Add new route
      const newRoute = {
        id: Math.max(...routes.map((r) => r.id), 0) + 1,
        from: formData.from,
        to: formData.to,
        distance: formData.distance,
        duration: formData.duration,
        price: Number(formData.price),
        active: formData.active,
      };
      setRoutes([...routes, newRoute]);
    }

    setIsModalOpen(false);
  };

  // Filter routes based on search term and active filter
  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.to.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterActive === "all") return matchesSearch;
    if (filterActive === "active") return matchesSearch && route.active;
    if (filterActive === "inactive") return matchesSearch && !route.active;

    return matchesSearch;
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
        <h1 className="text-2xl font-semibold text-gray-900">Manage Routes</h1>
        <button
          onClick={handleAddRoute}
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
          Add New Route
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
              placeholder="Search routes"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-none">
          <select
            id="filter"
            name="filter"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
          >
            <option value="all">All Routes</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Origin
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Destination
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Distance
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Duration
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
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
              {filteredRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {route.from}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.to}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.distance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    RS.{route.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        route.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {route.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleToggleActive(route.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      {route.active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleEditRoute(route)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRoute(route.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRoutes.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No routes found matching your criteria.
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
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {isEditing ? "Edit Route" : "Add New Route"}
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="from"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Origin
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="from"
                              id="from"
                              required
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.from}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="to"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Destination
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="to"
                              id="to"
                              required
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.to}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="distance"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Distance
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="distance"
                              id="distance"
                              required
                              placeholder="e.g. 215 miles"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.distance}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="duration"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Duration
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="duration"
                              id="duration"
                              required
                              placeholder="e.g. 4h 30m"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.duration}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Price ($)
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              name="price"
                              id="price"
                              required
                              min="0"
                              step="0.01"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={formData.price}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <div className="flex items-center h-full">
                            <input
                              id="active"
                              name="active"
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              checked={formData.active}
                              onChange={handleInputChange}
                            />
                            <label
                              htmlFor="active"
                              className="ml-2 block text-sm text-gray-700"
                            >
                              Active Route
                            </label>
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

export default Routes;
