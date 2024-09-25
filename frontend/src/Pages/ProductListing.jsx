import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductListing = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/product");
        setProductData(response.data.products); // Adjust based on your API response structure
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Top Section with Filters and Search */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Studimart</h2>
          <p className="text-gray-600 mb-8">
            The Marketplace for Students to Buy & Sell College Essentials!
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex items-center border rounded-full p-2 bg-white">
              <input
                type="text"
                placeholder="Search items..."
                className="border-none outline-none px-4 py-2 rounded-l-full w-64"
              />
            </div>
            {/* Filter Options */}
            <div className="flex flex-wrap gap-4">
              <select className="border rounded-full p-2 bg-white px-4 py-2 rounded-l-full w-64">
                <option value="all">All Categories</option>
                <option value="books">Books</option>
                <option value="electronics">Electronics</option>
                <option value="stationery">Stationery</option>
                <option value="furniture">Furniture</option>
              </select>
            </div>
            {/* Filter Buttons */}
            <div className="flex gap-4 mt-4">
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                Apply Filters
              </button>
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productData.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105"
            >
              <img
                src={product.productImages[0] ? `http://localhost:8080/${product.productImages[0].productImage}` : "https://via.placeholder.com/150"}
                alt={product.productName}
                className="w-full h-48 object-cover mb-4 rounded"
              />

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.productName}
              </h3>
              <p className="text-gray-600 mb-2">
                Category: <strong>{product.categoryID}</strong>
              </p>
              <p className="text-gray-600 mb-2">
                Status: <strong>{product.statusFlag === 1 ? "Unsold" : "Sold"}</strong>
              </p>
              <p className="text-xl font-bold text-orange-500 mb-4">
                {product.productPrice.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
              </p>
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListing;