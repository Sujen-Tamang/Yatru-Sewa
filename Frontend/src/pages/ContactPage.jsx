"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setFormStatus({ submitted: true, success: true, message: "Thank you for your message! We'll get back to you soon." })
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-600 mb-2">Get In Touch</h1>
        <p className="text-center text-gray-600 mb-10 text-lg">We'd love to hear from you! Whether you have a question, feedback, or need assistance, feel free to reach out.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-6">Contact Information</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-500 text-xl mt-1" />
                <div>
                  <div className="font-semibold text-gray-800">Our Office</div>
                  <div className="text-blue-700">123 Yatri Marg, Kathmandu, Nepal</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-blue-500 text-xl mt-1" />
                <div>
                  <div className="font-semibold text-gray-800">Email Us</div>
                  <a href="mailto:support@yatrisuvidha.com" className="text-blue-700">support@yatrisuvidha.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaPhone className="text-blue-500 text-xl mt-1" />
                <div>
                  <div className="font-semibold text-gray-800">Call Us</div>
                  <a href="tel:+97715550123" className="text-blue-700">+977-1-5550123</a>
                </div>
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" alt="Contact" className="rounded-xl w-full object-cover max-h-64 shadow" />
          </div>
          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-6">Send us a Message</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Regarding..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-lg transition-all"
                disabled={loading}
              >
                <FaPaperPlane className="mr-2" /> {loading ? "Sending..." : "Send Message"}
              </button>
              {formStatus.submitted && (
                <div className={`mt-2 text-center text-sm ${formStatus.success ? "text-green-600" : "text-red-600"}`}>{formStatus.message}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage