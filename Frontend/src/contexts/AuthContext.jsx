"use client"
import axios from "axios"
import { createContext, useState, useContext, useEffect, useMemo } from "react"
import { login, logout, register, requestVerification, verifyEmail } from "../../services/auth"
import { toast } from "react-toastify"

// 1. Create context outside component
const AuthContext = createContext(null)

// 2. Stable custom hook export
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// 3. Main provider component with stable reference
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)

  // Check auth status on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if (user && token) {
          const userData = JSON.parse(user)
          if (userData && (!userData.role || userData.role === 'user')) {
            const completeUser = {
              ...userData,
              token // Ensure token is included
            }
            setCurrentUser(completeUser)
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
        setAuthChecked(true)
      }
    }

    checkAuthStatus()
  }, [])

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const result = await login({ email, password })

      if (result.success && result.user) {
        // Check if the user is trying to access with admin credentials
        if (result.user.role === 'admin') {
          toast.error("Please use the admin login page for admin access")
          return { 
            success: false, 
            error: "Please use the admin login page for admin access"
          }
        }
        
        // Proceed with regular user login
        const userWithToken = {
          ...result.user,
          token: result.token,
          isVerified: result.user.isVerified // Ensure verification status
        }

        setCurrentUser(userWithToken)
        localStorage.setItem("user", JSON.stringify(userWithToken))
        localStorage.setItem("token", result.token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${result.token}`

        toast.success("Login successful!")
        return { success: true, user: userWithToken }
      }

      // Handle errors
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      delete axios.defaults.headers.common["Authorization"]

      const errorMsg = result?.message || "Login failed"
      toast.error(errorMsg)
      return { success: false, error: errorMsg }

    } catch (error) {
      toast.error("Login error occurred")
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (userData) => {
    try {
      setLoading(true)
      const result = await register(userData)

      if (result.success) {
        toast.success("Registration successful! Please verify.")
        return { success: true }
      }

      toast.error(result.message || "Registration failed")
      return { success: false, error: result.message }
    } catch (error) {
      toast.error("Registration error")
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      await logout()
      setCurrentUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      delete axios.defaults.headers.common["Authorization"]
      toast.success("Logged out successfully")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  const verifyUser = async (verificationCode) => {
    if (!currentUser?.email) {
      toast.error("Login required")
      return { success: false, error: "Not logged in" }
    }

    try {
      setLoading(true)
      const result = await verifyEmail(currentUser.email, verificationCode)

      if (result.success) {
        const updatedUser = {
          ...currentUser,
          isVerified: true,
          token: result.token || currentUser.token
        }

        setCurrentUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
        if (result.token) {
          localStorage.setItem("token", result.token)
          axios.defaults.headers.common["Authorization"] = `Bearer ${result.token}`
        }

        toast.success("Account verified!")
        return { success: true }
      }

      toast.error(result.message || "Verification failed")
      return { success: false, error: result.message }

    } catch (error) {
      toast.error("Verification error")
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    currentUser,
    isAuthenticated: !!currentUser,
    isVerified: currentUser?.isVerified || false,
    loading,
    authChecked,
    signIn,
    signUp,
    signOut,
    verifyUser,
    requestUserVerification: async () => {
      if (!currentUser?.email) {
        toast.error("Login required")
        return { success: false }
      }
      try {
        setLoading(true)
        const result = await requestVerification(currentUser.email)
        if (result.success) {
          toast.success("Verification code sent")
          return { success: true }
        }
        toast.error(result.message || "Request failed")
        return { success: false, error: result.message }
      } catch (error) {
        toast.error("Request error")
        return { success: false, error: error.message }
      } finally {
        setLoading(false)
      }
    },
    hasRole: (role) => currentUser?.role === role
  }), [currentUser, loading, authChecked])

  return (
      <AuthContext.Provider value={contextValue}>
        {(!loading || authChecked) && children}
      </AuthContext.Provider>
  )
}

// Add display name for debugging
AuthContext.displayName = "AuthContext"