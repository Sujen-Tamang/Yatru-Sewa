"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const TwoStepVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef([])

  const { verifyCode } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Focus the first input on component mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Move to next input if current input is filled
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const verificationCode = code.join("")
    if (verificationCode.length !== 6) {
      return setError("Please enter the 6-digit code")
    }

    try {
      setError("")
      setLoading(true)
      const result = await verifyCode(verificationCode)

      if (result.success) {
        navigate("/signin")
      } else {
        setError(result.error || "Invalid verification code")
      }
    } catch (err) {
      setError("Failed to verify code")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = () => {
    // In a real app, this would resend the verification code
    alert("Verification code would be resent here")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-2">Two Step Verification</h1>
      <p className="text-center text-gray-600 mb-6">
        A verification code has been sent to your mobile. Please enter it in the field below.
      </p>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Type your 6 digits security code</p>
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify My Account"}
        </button>
      </form>

      <div className="mt-4 text-center">
        Didn't get the code?{" "}
        <button onClick={handleResend} className="text-blue-600 hover:underline bg-transparent border-none p-0 inline">
          Resend
        </button>
      </div>
    </div>
  )
}

export default TwoStepVerification