"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { resetPassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      return setError("Please enter your email")
    }

    try {
      setError("")
      setLoading(true)
      const result = await resetPassword(email)

      if (result.success) {
        navigate("/success")
      } else {
        setError(result.error || "Failed to send reset link")
      }
    } catch (err) {
      setError("Failed to send reset link")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-2">Forgot Your Password?</h1>
      <p className="text-center text-gray-600 mb-6">
        Enter your email address linked to your account, and we'll send you a link to reset your password.
      </p>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Connect@yoursewa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <div className="mt-4 text-center">
        Wait, I remember my password...{" "}
        <Link to="/signin" className="text-blue-600 hover:underline">
          Click here
        </Link>
      </div>
    </div>
  )
}

export default ForgotPassword