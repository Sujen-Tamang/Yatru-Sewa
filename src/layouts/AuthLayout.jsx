import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout