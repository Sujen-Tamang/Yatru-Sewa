"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "react-toastify"

const TwoStepVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState("request")
  const inputRefs = useRef([])
  const { currentUser, requestUserVerification, verifyUser } = useAuth()
  const navigate = useNavigate()

  // Debug current user status
  useEffect(() => {
    console.log("Current user verification status:", currentUser?.isVerified)
  }, [currentUser])

  // Focus first input when verification step starts
  useEffect(() => {
    if (step === "verify" && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [step])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const verificationCode = code.join("")

    if (verificationCode.length !== 6) {
      setError("Please enter the 6-digit code")
      return
    }

    try {
      setError("")
      setLoading(true)

      // Verify with both email and code
      const result = await verifyUser(verificationCode)
      console.log("Verification API Response:", result)

      if (result?.success) {
        toast.success("Account verified successfully!")
        navigate("/customer/dashboard", { replace: true })
      } else {
        const errorMsg = result?.error || "Invalid verification code"
        setError(errorMsg)
        toast.error(errorMsg)
        setCode(["", "", "", "", "", ""])
        setTimeout(() => inputRefs.current[0]?.focus(), 100)
      }
    } catch (err) {
      console.error("Verification error:", err)
      setError(err.response?.data?.message || "Verification failed")
      toast.error("Verification failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      setLoading(true)
      const result = await requestUserVerification()
      if (result?.success) {
        toast.success("New verification code sent!")
      } else {
        setError(result?.error || "Failed to resend code")
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
      setError("")
      const result = await requestUserVerification()

      if (result?.success) {
        setStep("verify")
        toast.success("Verification code sent!")
      } else {
        setError(result?.error || "Failed to send code")
      }
    } catch (err) {
      setError("Failed to request verification code")
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10">
        <h1 className="text-2xl font-bold text-center mb-2">Account Verification</h1>

        {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
        )}

        {step === "request" ? (
            <div>
              <p className="text-center text-gray-600 mb-6">
                We'll send a verification code to your registered email.
              </p>
              <button
                  onClick={handleRequestCode}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </button>
            </div>
        ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-center text-gray-600 mb-6">
                Enter the 6-digit code sent to your email
              </p>

              <div className="flex justify-between gap-2 mb-6">
                {code.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                ))}
              </div>

              <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify Account"}
              </button>
            </form>
        )}

        <div className="mt-4 text-center">
          {step === "verify" ? (
              <>
                Didn't receive code?{" "}
                <button
                    onClick={handleResend}
                    className="text-blue-600 hover:underline"
                    disabled={loading}
                >
                  Resend Code
                </button>
              </>
          ) : (
              <button
                  onClick={() => navigate(-1)}
                  className="text-blue-600 hover:underline"
              >
                Go Back
              </button>
          )}
        </div>
      </div>
  )
}

export default TwoStepVerification;