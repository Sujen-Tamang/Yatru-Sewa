"use client"
import axios from "axios"

import { createContext, useState, useContext, useEffect } from "react"
import { login } from "../../services/auth"

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    
    if (user && token) {  
      setCurrentUser(JSON.parse(user))
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
    setLoading(false)
  }, [])

  const signIn = async (email, password) => {
    try {
      const result = await login({ email, password })

      if (result.success) {
        setCurrentUser(result.user)
        return { success: true }
      } else {
        return { success: false, error: result.message || "Login failed" }
      }
    } catch (error) {
      return { success: false, error: "An error occurred during login" }
    }
  }

  const signOut = () => {
    authLogout()
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    signIn,
    signOut,
    loading
  }

  return (<AuthContext.Provider value={value}>
    {!loading && children}
    </AuthContext.Provider>)
}