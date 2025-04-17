"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on initial load
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  // Sign in function
  const signIn = async (email, password) => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const userData = { id: "123", email, name: "Demo User" }
      setCurrentUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Sign up function
  const signUp = async (firstName, lastName, email, password) => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful registration
      return { success: true, requireVerification: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Sign out function
  const signOut = () => {
    setCurrentUser(null)
    localStorage.removeItem("user")
  }

  // Reset password function
  const resetPassword = async (email) => {
    try {
      // In a real app, this would be an API call to your backend
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Verify code function
  const verifyCode = async (code) => {
    try {
      // In a real app, this would be an API call to your backend
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    currentUser,
    signIn,
    signUp,
    signOut,
    resetPassword,
    verifyCode,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}