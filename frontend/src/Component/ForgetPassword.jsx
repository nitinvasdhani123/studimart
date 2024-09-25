import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setErrorMessage("Email is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:8080/user/forget/password/submit", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        // Store the email in local storage
        localStorage.setItem("email", formData.email);

        setSuccessMessage(response.data); // Display success message
        setErrorMessage(""); // Clear error message if successful

        // Redirect to /forget-password/otp after a delay
        setTimeout(() => {
          navigate("/forget-password/otp");
        }, 1000); // Redirect after 3 seconds
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Failed to send OTP. Please try again."); 
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
          <h2 className="text-3xl font-bold text-orange-500">Forgot Password</h2>
          <p className="text-gray-600">Please enter your email to receive an OTP.</p>
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
            />
            {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded transition-colors ${
              isSubmitting ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remembered your password?{" "}
            <a href="/login" className="text-orange-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;