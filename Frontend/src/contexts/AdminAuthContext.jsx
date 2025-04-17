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

  // Admin sign in function (calls real API)
  const adminSignIn = async (email, password) => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (response.ok && result.id && result.email) {
        const adminData = {
          id: result.id,
          name: result.name,
          email: result.email,
          phone: result.phone,
          role: result.role,
          permissions: [], // Optional: fill this in if your API returns permissions
        }

        setCurrentAdmin(adminData)
        localStorage.setItem("admin", JSON.stringify(adminData))
        return { success: true }
      } else {
        return { success: false, error: result.error || "Login failed" }
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