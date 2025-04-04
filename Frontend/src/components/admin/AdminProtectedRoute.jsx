import { Navigate, Outlet } from "react-router-dom"
import { useAdminAuth } from "../../contexts/AdminAuthContext"

const AdminProtectedRoute = () => {
  const { currentAdmin, loading } = useAdminAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!currentAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

export default AdminProtectedRoute