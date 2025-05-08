import { Navigate, Outlet } from "react-router-dom"
import { useAdminAuth } from "../../contexts/AdminAuthContext"

const AdminProtectedRoute = () => {
  const { adminUser, loading } = useAdminAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!adminUser) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default AdminProtectedRoute