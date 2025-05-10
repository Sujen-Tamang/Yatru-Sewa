"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "react-toastify"

const TwoStepVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState("request") // "request" or "verify"
  const inputRefs = useRef([])

  const { requestUserVerification, verifyUser } = useAuth()
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
      console.log("Submitting verification code:", verificationCode)
      
      // Make sure we're passing both email and OTP to the verifyUser function
      const result = await verifyUser(verificationCode)
      console.log("Verification result:", result)

      if (result.success) {
        toast.success("Your account has been verified successfully!")
        navigate("/customer/dashboard")
      } else {
        // Check if we have a specific error message
        const errorMsg = result.error || "Invalid verification code"
        setError(errorMsg)
        toast.error(errorMsg)
        
        // If the error is related to the verification code, clear the input fields
        if (errorMsg.includes("verification code") || errorMsg.includes("OTP")) {
          setCode(["", "", "", "", "", ""])
          // Focus the first input field after a short delay
          setTimeout(() => {
            if (inputRefs.current[0]) {
              inputRefs.current[0].focus()
            }
          }, 100)
        }
      }
    } catch (err) {
      console.error("Verification error:", err)
      setError(err.message || "Failed to verify code")
      toast.error("Failed to verify your account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      setLoading(true)
      const result = await requestUserVerification()
      if (result.success) {
        toast.success("Verification code has been resent to your email")
      } else {
        setError(result.error || "Failed to resend verification code")
      }
    } catch (err) {
      setError("Failed to resend verification code")
    } finally {
      setLoading(false)
    }
  }

  const handleRequestCode = async () => {
    try {
      setLoading(true)
      setError("") // Clear any previous errors
      console.log("Requesting verification code...")
      const result = await requestUserVerification()
      console.log("Verification request result:", result)
      
      if (result.success) {
        setStep("verify")
        toast.success("Verification code sent to your email")
        // Focus first input after a short delay
        setTimeout(() => {
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
          }
        }, 100)
      } else {
        setError(result.error || "Failed to send verification code")
        toast.error(result.error || "Failed to send verification code")
      }
    } catch (err) {
      console.error("Error requesting verification code:", err)
      setError(err.message || "Failed to send verification code")
      toast.error("Failed to send verification code")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-2">Account Verification</h1>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      {step === "request" ? (
        <div>
          <p className="text-center text-gray-600 mb-6">
            To verify your account, we'll send a verification code to your email address.
          </p>

          <button
            onClick={handleRequestCode}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </button>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/customer/dashboard")}
              className="text-blue-600 hover:underline bg-transparent border-none p-0 inline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="text-center text-gray-600 mb-6">
            A verification code has been sent to your email. Please enter it below.
          </p>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Enter your 6-digit verification code</p>
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

          <div className="mt-4 text-center">
            Didn't get the code?{" "}
            <button
              onClick={handleResend}
              className="text-blue-600 hover:underline bg-transparent border-none p-0 inline"
              disabled={loading}
            >
              Resend
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default TwoStepVerification