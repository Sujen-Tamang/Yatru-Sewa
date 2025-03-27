"use client"
import { useNavigate } from "react-router-dom"

const SuccessPage = () => {
  const navigate = useNavigate()

  return (
    <div className="p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Success!</h1>

      <p className="text-gray-600 mb-6">
        A email has been send to your email@domain.com. Please check for an email from company and click on the included
        link to reset your password.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Back to home
      </button>
    </div>
  )
}

export default SuccessPage