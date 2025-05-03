"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { AdminAuthProvider } from "./contexts/AdminAuthContext"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

// Auth Pages
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import ForgotPassword from "./pages/auth/ForgotPassword"
import TwoStepVerification from "./pages/auth/TwoStepVerification"
import SuccessPage from "./pages/auth/SuccessPage"

// Static Pages
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"

// Customer Pages
import CustomerDashboard from "./pages/customer/Dashboard"
import CustomerBookings from "./pages/customer/Bookings"

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminRoutes from "./pages/admin/Routes"
import AdminSchedules from "./pages/admin/Schedules"
import AdminUsers from "./pages/admin/Users"
import AdminBookings from "./pages/admin/Bookings"
import AdminPayments from "./pages/admin/Payments"
import AdminSettings from "./pages/admin/Settings"
import AdminDrivers from "./pages/admin/Drivers"

// Layout Components
import AuthLayout from "./layouts/AuthLayout"
import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout"
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
    })
  }, [])

  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify" element={<TwoStepVerification />} />
              <Route path="/success" element={<SuccessPage />} />
            </Route>

            {/* Customer Protected Routes */}
            {/* <Route element={<ProtectedRoute />}> */}
              <Route path="/customer" element={<CustomerDashboard />} />
              <Route path="/customer/bookings" element={<CustomerBookings />} />
            {/* </Route> */}

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* <Route element={<AdminProtectedRoute />}> */}
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/routes" element={<AdminRoutes />} />
                <Route path="/admin/schedules" element={<AdminSchedules />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/payments" element={<AdminPayments />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/drivers" element={<AdminDrivers />} />
              {/* </Route> */}
            </Route>

            {/* Main Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Default route redirects to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  )
}

export default App
