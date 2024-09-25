import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrNumber: "", 
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.emailOrNumber) errors.emailOrNumber = "Email or Number is required";
    if (!formData.password) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post("http://localhost:8080/user/login/submit", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data) {
          setSuccessMessage(response.data.message); // Display success message
          localStorage.setItem("token", response.data.token); 
          setErrorMessage(""); // Clear error message if successful
          // const token = localStorage.getItem('token');
          // console.log('authToken',token);
          setTimeout(() => {
            navigate("/", {
              state: {
                successMessage: response.data.message,
              },
            });
          }, 1000); // Redirect after showing success message for 3 seconds
        }
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message || "Login failed. Please try again."); // Display error message
          setSuccessMessage(""); // Clear success message if error occurs
        } else {
          setErrorMessage("Network error. Please check your connection.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-orange-500">Login</h2>
          <p className="text-gray-600">Welcome back! Please log in to your account.</p>
        </div>

        {/* Display success or error message */}
        {successMessage && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">{successMessage}</div>}
        {errorMessage && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Email or Phone Number</label>
            <input
              type="text"
              name="emailOrNumber"
              value={formData.emailOrNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.emailOrNumber ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
              }`}
              placeholder="Enter your email or phone number"
            />
            {errors.emailOrNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.emailOrNumber}</p>
            )}
          </div>

          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded transition-colors ${
              isSubmitting ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-orange-500 hover:underline">
              Sign up
            </a>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <a href="/forget-password" className="text-orange-500 hover:underline">
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;