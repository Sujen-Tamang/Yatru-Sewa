"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import * as Popover from "@radix-ui/react-popover"

const cn = (...classes) => classes.filter(Boolean).join(' ')

const allLocations = ["Kathmandu", "Pokhara", "Chitwan", "Butwal", "Biratnagar", "Dharan", "Birgunj", "Nepalgunj"]

const HomePage = () => {
  const navigate = useNavigate()
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState(new Date())

  const handleSearch = (e) => {
    e.preventDefault()
    if (!from || !to || !date) return

    const formattedDate = format(date, "yyyy-MM-dd")
    navigate(
        `/bus-booking?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(formattedDate)}`,
    )
  }

  const availableFrom = to ? allLocations.filter((loc) => loc !== to) : allLocations
  const availableTo = from ? allLocations.filter((loc) => loc !== from) : allLocations

  return (
      <div className="overflow-hidden">
        {/* Search Section - Styled to match the image */}
        <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 pt-24 pb-48 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

          {/* Background decorative elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl opacity-20"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Bus Route</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Search, compare, and book bus tickets online with ease.
              </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <form className="p-8" onSubmit={handleSearch}>
                <div className="flex flex-col md:flex-row items-end gap-4">
                  <div className="w-full md:w-auto flex-1">
                    <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                      From
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                          id="from"
                          className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                          required
                      >
                        <option value="" disabled>
                          Select departure
                        </option>
                        {availableFrom.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex-1">
                    <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                      To
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                          id="to"
                          className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                          required
                      >
                        <option value="" disabled>
                          Select destination
                        </option>
                        {availableTo.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input 
                        type="date" 
                        value={format(date, "yyyy-MM-dd")} 
                        min={format(new Date(), "yyyy-MM-dd")}
                        onChange={(e) => setDate(new Date(e.target.value))}
                        className="w-full h-12 pl-10 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    <button
                        type="submit"
                        className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 h-12 font-medium"
                    >
                      Search Buses
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                className="w-full h-auto"
                preserveAspectRatio="none"
            >
              <path
                  fill="#ffffff"
                  fillOpacity="1"
                  d="M0,160L48,144C96,128,192,96,288,90.7C384,85,480,107,576,122.7C672,139,768,149,864,144C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                  Travel with <span className="text-blue-600">Comfort</span> and{" "}
                  <span className="text-blue-600">Convenience</span>
                </h2>
                <p className="text-xl mb-8 text-gray-600">
                  Book bus tickets online, track your bus in real-time, and enjoy a hassle-free journey with BusTracker.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                      to="/signup"
                      className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition duration-300 text-center transform hover:scale-105"
                  >
                    Get Started
                  </Link>
                  <Link
                      to="#how-it-works"
                      className="bg-gray-100 text-gray-800 px-8 py-4 rounded-xl font-medium hover:bg-gray-200 transition duration-300 text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
              <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="hidden md:block"
              >
                <img
                    src="/bus-hero.jpg"
                    alt="Bus travel illustration"
                    className="rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BusTracker</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide the best bus ticketing and tracking experience with features designed for your comfort and
                convenience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
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
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Easy Booking</h3>
                <p className="text-gray-600">
                  Book your bus tickets in just a few clicks from anywhere, anytime. Our user-friendly platform makes
                  booking a breeze.
                </p>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Real-time Tracking</h3>
                <p className="text-gray-600">
                  Track your bus location in real-time and never miss your bus again. Get accurate ETAs and journey
                  updates.
                </p>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Secure Payments</h3>
                <p className="text-gray-600">
                  Multiple secure payment options for a worry-free booking experience. Your financial information is
                  always protected.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-4xl font-bold mb-6">Ready to Simplify Your Bus Travel?</h2>
                <p className="text-xl mb-8 text-blue-100">
                  Join thousands of satisfied customers who have made BusTracker their go-to platform for bus ticketing
                  and tracking.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                      to="/signup"
                      className="bg-white text-blue-600 px-8 py-4 rounded-xl font-medium hover:bg-blue-50 transition duration-300 text-center transform hover:scale-105"
                  >
                    Get Started
                  </Link>
                  <Link
                      to="/contact"
                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition duration-300 text-center"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <motion.img
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    src="/app-preview.jpg"
                    alt="Mobile app screenshot"
                    className="rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  )
}

export default HomePage