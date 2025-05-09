"use client"
import axios from "axios"

import { createContext, useState, useContext, useEffect } from "react"
import { login, logout, register } from "../../services/auth"
import { toast } from "react-toastify"

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)

  // Check if user is already logged in on initial load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        
        if (user && token) {  
          const userData = JSON.parse(user)

          if (userData && (!userData.role || userData.role === 'user')) {
            setCurrentUser(userData)
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
          }
        }
      } catch (error) {
        console.error("Error checking auth status:", error)
        // Clear potentially corrupted auth data
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
        setAuthChecked(true)
      }
    }
    
    checkAuthStatus()
  }, [])

  // Sign in function for users
  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const result = await login({ email, password })

      if (result.success) {
        if (result.user && (!result.user.role || result.user.role === 'user')) {
          setCurrentUser(result.user)
          toast.success("Successfully logged in!")
          return { success: true }
        } else {
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          delete axios.defaults.headers.common["Authorization"]
          return { 
            success: false, 
            error: "Invalid user credentials. Admin users should use the admin login." 
          }
        }
      } else {
        toast.error(result.message || "Login failed")
        return { success: false, error: result.message || "Login failed" }
      }
    } catch (error) {
      toast.error("An error occurred during login")
      return { success: false, error: "An error occurred during login" }
    } finally {
      setLoading(false)
    }
  }

  // Sign up function for new users
  const signUp = async (userData) => {
    try {
      setLoading(true)
      const result = await register(userData)

      if (result.success) {
        toast.success("Registration successful! Please verify your account.")
        return { success: true }
      } else {
        toast.error(result.message || "Registration failed")
        return { success: false, error: result.message || "Registration failed" }
      }
    } catch (error) {
      toast.error("An error occurred during registration")
      return { success: false, error: "An error occurred during registration" }
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true)
      await logout()
      setCurrentUser(null)
      toast.success("Successfully logged out")
    } catch (error) {
      console.error("Error during logout:", error)
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      delete axios.defaults.headers.common["Authorization"]
      setCurrentUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Check if user is authenticated and has specific role
  const hasRole = (role) => {
    if (!currentUser) return false
    return currentUser.role === role
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    signIn,
    signUp,
    signOut,
    hasRole,
    loading,
    authChecked
  }

  return (
    <AuthContext.Provider value={value}>
      {(!loading || authChecked) && children}
    </AuthContext.Provider>
  )
}