// ListingsSection.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ListingsSection = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/product");
        console.log(response.data.products);
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
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Top Listings</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {productData.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-orange-500 rounded-lg overflow-hidden transition-transform duration-300 transform hover:translate-y-1 hover:shadow-lg"
            >
              <img
                src={product.productImages[0] ? `http://localhost:8080/${product.productImages[0].productImage}` : "https://via.placeholder.com/150"}
                alt={product.productName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-orange-500 mb-2">
                  {product.productPrice.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                </h3>
                <p className="text-sm text-gray-600">{product.productName}</p>
                <p className="text-sm text-gray-600">{product.categoryID}</p>
                <p className="text-sm text-gray-500">{product.userID}</p>
                <p className="text-xs text-gray-400 mt-2">{product.statusFlag === 1 ? "Unsold" : "Sold"}</p>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                    Buy
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListingsSection;
