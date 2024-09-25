import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import axios from "axios"; // Import axios

const OTP = () => {
  const location = useLocation(); // Access the location object
  const navigate = useNavigate(); // Navigation after success

  const { successMessage, token } = location.state || {}; // Get successMessage and token from state

  const [otp, setOtp] = useState(""); // State to handle OTP input
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState(""); // New state for server messages

  // Handle input change for OTP
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Reset errors
    setServerMessage(""); // Clear any previous server message

    // Create form data similar to the Signup component
    const formData = {
      otp: otp, // The entered OTP
      token: token, // The token from the state
    };

    try {
      // Make POST request to /verify/signup/otp/submit
      const response = await axios.post(
        "http://localhost:8080/user/verify/signup/otp/submit",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      // Handle the response
      if (response.data) {
        setServerMessage(response.data.message); // Set the success message from the response

        // Pass success message when navigating to /login
        navigate("/login", {
          state: {
            successMessage: response.data.message,
          },
        });
      }
    } catch (error) {
      // Handle server and network errors
      if (error.response) {
        // Server errors (non-2xx responses)
        setErrors({
          server:
            error.response.data.message || "OTP verification failed. Please try again.",
        });
      } else {
        // Network errors or other unexpected issues
        setErrors({ server: "Network error. Please check your connection." });
      }
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* Display the success message if available */}
        {successMessage && (
          <div className="mb-6 text-green-500 text-center">
            {successMessage}
          </div>
        )}

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-orange-500">Enter OTP</h2>
          <p className="text-gray-600">Please check your email for the OTP.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* OTP Input Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              OTP
            </label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.otp
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-orange-500"
              }`}
              placeholder="Enter the OTP"
            />
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
            )}
          </div>

          {/* Hidden input field to store the token */}
          <input type="hidden" name="token" value={token} />

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded transition-colors ${
              isSubmitting
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit OTP"}
          </button>

          {/* Display the server message */}
          {serverMessage && (
            <div className="text-green-500 text-center mt-4">
              {serverMessage}
            </div>
          )}

          {/* Server error message */}
          {errors.server && (
            <p className="text-red-500 text-center mt-4">{errors.server}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default OTP;