"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AdminAuthContext = createContext(null)

export const useAdminAuth = () => useContext(AdminAuthContext)

export const AdminAuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if admin is logged in on initial load
  useEffect(() => {
    const admin = localStorage.getItem("admin")
    if (admin) {
      setCurrentAdmin(JSON.parse(admin))
    }
    setLoading(false)
  }, [])

  // Admin sign in function
  const adminSignIn = async (email, password) => {
    try {
      // In a real app, this would be an API call to your backend with proper authentication
      // For demo purposes, we'll simulate a successful login with admin credentials

      // Basic validation (would be handled by backend in production)
      if (email === "admin@bustracker.com" && password === "admin123") {
        const adminData = {
          id: "admin-1",
          email,
          name: "Admin User",
          role: "administrator",
          permissions: ["manage_routes", "manage_schedules", "view_users", "view_transactions"],
        }

        setCurrentAdmin(adminData)
        localStorage.setItem("admin", JSON.stringify(adminData))
        return { success: true }
      } else {
        return { success: false, error: "Invalid email or password" }
      }
    } catch (error) {
      return { success: false, error: error.message || "Failed to sign in" }
    }
  }

  // Admin sign out function
  const adminSignOut = () => {
    setCurrentAdmin(null)
    localStorage.removeItem("admin")
  }

  // Check if admin has specific permission
  const hasPermission = (permission) => {
    if (!currentAdmin || !currentAdmin.permissions) return false
    return currentAdmin.permissions.includes(permission)
  }

  const value = {
    currentAdmin,
    adminSignIn,
    adminSignOut,
    hasPermission,
    loading,
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}