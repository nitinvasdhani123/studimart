import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setFormData((prevData) => ({ ...prevData, email: storedEmail }));
    } else {
      navigate("/forget-password"); // Redirect if email is not found
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:8080/user/reset/password/submit", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        setSuccessMessage(response.data.message); // Display success message
        setErrorMessage(""); // Clear error message if successful
        // Remove email from local storage
        localStorage.removeItem("email");

        setTimeout(() => {
          navigate("/login"); // Redirect to login after a delay
        }, 1000); // Redirect after 3 seconds
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Failed to reset password. Please try again.");
      } else {
        setErrorMessage("Network error. Please check your connection.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-orange-500">Reset Password</h2>
          <p className="text-gray-600">Please enter your new password.</p>
        </div>

        {/* Display success or error message */}
        {successMessage && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">{successMessage}</div>}
        {errorMessage && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errorMessage ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
              }`}
              placeholder="Enter your email"
              readOnly // Email is retrieved from local storage and should not be editable
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errorMessage ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
              }`}
              placeholder="Enter your new password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errorMessage ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
              }`}
              placeholder="Confirm your new password"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded transition-colors ${
              isSubmitting ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;