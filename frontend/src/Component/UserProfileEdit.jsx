import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    pic: null,
    college: "",
    address: "",
    state: "",
    city: "",
    region: "",
    postalCode: "",
    // latitude: "",
    // longitude: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [defaultPic, setDefaultPic] = useState("");
  const navigate = useNavigate();

  // Fetch user profile data and populate formData
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8080/user/profile", { token });

        if (response.data) {
          const user = response.data.user;
          setFormData({
            name: user.name || "",
            number: user.number || "",
            email: user.email || "",
            pic: user.pic || null,
            college: user.college || "",
            address: user.address || "",
            state: user.state || "",
            city: user.city || "",
            region: user.region || "",
            postalCode: user.postalCode || "",
            // latitude: user.latitude || "",
            // longitude: user.longitude || "",
          });
          setDefaultPic(`http://localhost:8080/${user.pic}`); // Default image path
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setErrorMessage("Failed to load profile data.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
      setDefaultPic(imageUrl); // Set the preview image URL
      setFormData({ ...formData, pic: file }); // Update formData with the file
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.number) errors.number = "Phone number is required";
    if (!formData.email) errors.email = "Email is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const token = localStorage.getItem("token");

        // Prepare the form data to be sent in the update request
        const updateFormData = new FormData();
        updateFormData.append("name", formData.name);
        updateFormData.append("number", formData.number);
        updateFormData.append("email", formData.email);
        if (formData.pic) updateFormData.append("pic", formData.pic); // Only append if a new picture is selected
        updateFormData.append("college", formData.college);
        updateFormData.append("address", formData.address);
        updateFormData.append("state", formData.state);
        updateFormData.append("city", formData.city);
        updateFormData.append("region", formData.region);
        updateFormData.append("postalCode", formData.postalCode);
        // updateFormData.append("latitude", formData.latitude);
        // updateFormData.append("longitude", formData.longitude);
        updateFormData.append("token", token);
        // for (const [key, value] of updateFormData.entries()) {
        //   console.log(`${key}: ${value}`);
        // }
        const response = await axios.patch(
          "http://localhost:8080/user/profile/update",
          updateFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data) {
          setSuccessMessage(response.data.message);
          setErrorMessage("");
          setTimeout(() => {
            navigate("/user/profile/edit", {
              state: { successMessage: response.data.message },
            });
          }, 1000);
        }
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message || "Update failed. Please try again.");
          setSuccessMessage("");
        } else {
          setErrorMessage("Network error. Please check your connection.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-orange-500">Edit Profile</h2>
        </div>

        {successMessage && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">{successMessage}</div>}
        {errorMessage && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                }`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                  errors.number ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                }`}
                placeholder="Enter your phone number"
              />
              {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Profile Picture</label>
              <div className="mb-2">
                {defaultPic && (
                  <img
                    src={defaultPic}
                    alt="Profile Preview"
                    className="w-20 h-20 object-cover rounded-full border mb-2"
                  />
                )}
              </div>
              <input
                type="file"
                name="pic"
                accept="image/jpeg, image/jpg, image/png" // Add this line
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-1">College</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your college"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your address"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/3">
              <label className="block text-gray-700 text-sm font-medium mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your state"
              />
            </div>

            <div className="w-1/3">
              <label className="block text-gray-700 text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your city"
              />
            </div>

            <div className="w-1/3">
              <label className="block text-gray-700 text-sm font-medium mb-1">Region</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your region"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your postal code"
              />
            </div>

            {/* <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Latitude</label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter latitude"
              />
            </div> */}
          </div>

          {/* <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Longitude</label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter longitude"
              />
            </div>
          </div> */}

          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileEdit;