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
import BusBookingPage from "./pages/BusBookingPage"
import BookingConfirmationPage from "./pages/BookingConfirmationPage"

// Customer Pages
import CustomerDashboard from "./pages/customer/Dashboard"
import CustomerBookings from "./pages/customer/Bookings"
import CustomerBookingDetails from "./pages/customer/BookingDetails"

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminRoutes from "./pages/admin/Routes"
import AdminSchedules from "./pages/admin/ManageBuses.jsx"
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
import NotFound from "./pages/NotFound"
import Unauthorized from "./pages/Unauthorized"

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
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/auth/verify" element={<TwoStepVerification />} />
              <Route path="/auth/success" element={<SuccessPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="/customer/bookings" element={<CustomerBookings />} />
              <Route path="/customer/bookings/:id" element={<CustomerBookingDetails />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<AdminProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/routes" element={<AdminRoutes />} />
                <Route path="/admin/schedules" element={<AdminSchedules />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/payments" element={<AdminPayments />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/drivers" element={<AdminDrivers />} />
              </Route>
            </Route>

        
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/bus-booking" element={<BusBookingPage />} />
              <Route path="/customer/bookings/details" element={<CustomerBookingDetails />} />
              <Route path="/booking-confirmation/:id" element={<BookingConfirmationPage />} />
            </Route>

            {/* Error Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  )
}

export default App
