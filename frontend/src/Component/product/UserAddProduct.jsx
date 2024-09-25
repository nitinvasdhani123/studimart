import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserAddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    // statusFlag: "",
    categoryID: "",
    productImages: [], // Add field for product images
  });

  const [imagePreviews, setImagePreviews] = useState([]); // State to store image previews
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/category/list");
        if (response.data) {
          setCategories(response.data.categories);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file change and generate previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, productImages: files });

    // Generate image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.productName) errors.productName = "Product name is required";
    if (!formData.productPrice) errors.productPrice = "Product price is required";
    // if (!formData.statusFlag) errors.statusFlag = "Status flag is required";
    if (!formData.categoryID) errors.categoryID = "Category is required";
    if (formData.productImages.length === 0) errors.productImages = "At least one product image is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      // Create FormData to handle file upload
      const data = new FormData();
      data.append("productName", formData.productName);
      data.append("productPrice", formData.productPrice);
      // data.append("statusFlag", formData.statusFlag);
      data.append("categoryID", formData.categoryID);

      // Retrieve userID from local storage
      const token = localStorage.getItem("token");
      if (token) {
        data.append("token", token);
      } else {
        console.error("Token not found in local storage");
        setIsSubmitting(false);
        return; // Exit if userID is not available
      }

      // Append multiple images
      formData.productImages.forEach((image) => {
        data.append("productImages", image);
      });

      try {
        const response = await axios.post("http://localhost:8080/product/add", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.data) {
          navigate("/user/products", {
            state: { successMessage: response.data.message },
          });
        }
      } catch (error) {
        console.error("Error submitting product:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">Add Product</h2>

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.productName ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
              }`}
              placeholder="Enter product name"
            />
            {errors.productName && <p className="text-red-500 text-xs mt-1">{errors.productName}</p>}
          </div>

          {/* Product Price */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Product Price</label>
            <input
              type="text"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.productPrice ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
              }`}
              placeholder="Enter product price"
            />
            {errors.productPrice && <p className="text-red-500 text-xs mt-1">{errors.productPrice}</p>}
          </div>

          {/* Status Flag */}
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Status</label>
            <select
              name="statusFlag"
              value={formData.statusFlag}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.statusFlag ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
              }`}
            >
              <option value="">Select Status</option>
              <option value="1">Unsold</option>
              <option value="2">Sold</option>
            </select>
            {errors.statusFlag && <p className="text-red-500 text-xs mt-1">{errors.statusFlag}</p>}
          </div> */}

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Category</label>
            <select
              name="categoryID"
              value={formData.categoryID}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.categoryID ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
              }`}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {errors.categoryID && <p className="text-red-500 text-xs mt-1">{errors.categoryID}</p>}
          </div>

          {/* Product Images */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">Product Images</label>
            <input
              type="file"
              name="productImages"
              onChange={handleImageChange}
              multiple
              accept=".jpg,.jpeg,.png"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.productImages ? "border-red-500 focus:ring-red-500" : "focus:ring-orange-500"
              }`}
            />
            {errors.productImages && <p className="text-red-500 text-xs mt-1">{errors.productImages}</p>}
            
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover rounded" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded transition-colors ${
              isSubmitting ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAddProduct;