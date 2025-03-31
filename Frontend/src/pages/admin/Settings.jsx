"use client"

import { useState } from "react"
import { useAdminAuth } from "../../contexts/AdminAuthContext"

const Settings = () => {
  const { currentAdmin } = useAdminAuth()
  const [loading, setLoading] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const [emailForm, setEmailForm] = useState({
    newEmail: "",
    password: "",
  })
  const [emailError, setEmailError] = useState("")
  const [emailSuccess, setEmailSuccess] = useState(false)

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    booking: true,
    payment: true,
    systemUpdates: true,
  })
  const [notificationSuccess, setNotificationSuccess] = useState(false)

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    })
  }

  const handleEmailChange = (e) => {
    const { name, value } = e.target
    setEmailForm({
      ...emailForm,
      [name]: value,
    })
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    })
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess(false)

    // Validate password
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return setPasswordError("New passwords do not match")
    }

    if (passwordForm.newPassword.length < 8) {
      return setPasswordError("Password must be at least 8 characters long")
    }

    // Simulate API call to change password
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setPasswordSuccess(true)
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 1000)
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setEmailError("")
    setEmailSuccess(false)

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailForm.newEmail)) {
      return setEmailError("Please enter a valid email address")
    }

    // Simulate API call to change email
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setEmailSuccess(true)
      setEmailForm({
        newEmail: "",
        password: "",
      })
    }, 1000)
  }

  const handleNotificationSubmit = (e) => {
    e.preventDefault()
    setNotificationSuccess(false)

    // Simulate API call to update notification settings
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setNotificationSuccess(true)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>

      {/* Account Information */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Account Information</h2>
          <p className="mt-1 text-sm text-gray-500">Your personal account details.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{currentAdmin?.name || "Admin User"}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{currentAdmin?.email || "admin@bustracker.com"}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900">{currentAdmin?.role || "Administrator"}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Last Login</dt>
              <dd className="mt-1 text-sm text-gray-900">Today at 10:30 AM</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
          <p className="mt-1 text-sm text-gray-500">Update your password to keep your account secure.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {passwordSuccess && (
            <div className="mb-4 bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p>Password updated successfully!</p>
            </div>
          )}

          {passwordError && (
            <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{passwordError}</p>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long.</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Change Email */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Change Email</h2>
          <p className="mt-1 text-sm text-gray-500">Update your email address.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {emailSuccess && (
            <div className="mb-4 bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p>Email updated successfully!</p>
            </div>
          )}

          {emailError && (
            <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{emailError}</p>
            </div>
          )}

          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700">
                New Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="newEmail"
                  id="newEmail"
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={emailForm.newEmail}
                  onChange={handleEmailChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={emailForm.password}
                  onChange={handleEmailChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Email"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your notification preferences.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {notificationSuccess && (
            <div className="mb-4 bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p>Notification settings updated successfully!</p>
            </div>
          )}

          <form onSubmit={handleNotificationSubmit} className="space-y-6">
            <fieldset>
              <legend className="text-sm font-medium text-gray-700">Notification Methods</legend>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailNotifications"
                      name="emailNotifications"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                      Email Notifications
                    </label>
                    <p className="text-gray-500">Receive notifications via email.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="smsNotifications"
                      name="smsNotifications"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={notificationSettings.smsNotifications}
                      onChange={handleNotificationChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="smsNotifications" className="font-medium text-gray-700">
                      SMS Notifications
                    </label>
                    <p className="text-gray-500">Receive notifications via SMS.</p>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-medium text-gray-700">Notification Types</legend>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="booking"
                      name="booking"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={notificationSettings.booking}
                      onChange={handleNotificationChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="booking" className="font-medium text-gray-700">
                      Booking Notifications
                    </label>
                    <p className="text-gray-500">Receive notifications about new bookings.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="payment"
                      name="payment"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={notificationSettings.payment}
                      onChange={handleNotificationChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="payment" className="font-medium text-gray-700">
                      Payment Notifications
                    </label>
                    <p className="text-gray-500">Receive notifications about payments.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="systemUpdates"
                      name="systemUpdates"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={notificationSettings.systemUpdates}
                      onChange={handleNotificationChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="systemUpdates" className="font-medium text-gray-700">
                      System Updates
                    </label>
                    <p className="text-gray-500">Receive notifications about system updates and maintenance.</p>
                  </div>
                </div>
              </div>
            </fieldset>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Preferences"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings