"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { login } from "../../servcies/auth"

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  const signIn = async (email, password) => {
    try {
      const logindata = { email, password };
      const result = await login(logindata);

      if (result.success) {
        setCurrentUser(result.user); 
        localStorage.setItem("user", JSON.stringify(result.user)); 
        return { success: true };
      } else {
        return { success: false, error: result.message || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "An error occurred during login" };
    }
  }

  // Other functions like signUp, signOut, etc., remain unchanged...

  const value = {
    currentUser,
    signIn,
    // Include other functions like signUp, signOut, resetPassword, verifyCode here...
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}