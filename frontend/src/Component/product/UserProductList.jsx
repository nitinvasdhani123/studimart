import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductListing = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddProduct = () => {
    navigate("/user/product/add");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("token", token);
      try {
        const response = await axios.post("http://localhost:8080/product/list", {token});

        setProductData(response.data.products);
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
        <div className="text-center mb-10 mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Product List</h2>
          <button 
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={handleAddProduct}
          >
            Add Your Product
          </button>
        </div>

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