import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

const AdminProtectedRoute = () => {
  const { currentAdmin, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Checking admin authentication...</p>
        </div>
    );
  }

  // Check if user is authenticated AND has admin role
  if (!currentAdmin || currentAdmin.role !== 'admin') {
    // Redirect unauthorized users to the admin login page
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;