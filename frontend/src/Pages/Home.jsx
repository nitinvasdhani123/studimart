import React, { useState, useEffect } from "react";
import "../styles/style.css";
import Slider from "../Component/Slider";
import Hero from "../Component/Home/Hero";
import ListingsSection from "../Component/Home/ListingSection";
import ReviewSection from "../Component/Home/ReviewSection";
import { useLocation } from "react-router-dom"; // Import useLocation to get state

const Home = () => {
  const location = useLocation(); // Get location from React Router
  const [message, setMessage] = useState({
    text: "",
    type: "", // 'success' or 'error'
  });

  // If the message exists in location.state, display it
  useEffect(() => {
    if (location.state && location.state.message) {
      const { text, type } = location.state.message;
      setMessage({ text, type });

      // Automatically remove the message after 5 seconds
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);

      // Cleanup the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div>
      {/* Show success or error message if exists */}
      {message.text && (
        <div
          className={`alert ${
            message.type === "success"
              ? "alert-success"
              : "alert-danger"
          } text-center p-4 mb-4`}
        >
          {message.text}
        </div>
      )}

      {/* Hero Section */}
      <Hero />

      {/* Refined Service Banner Section */}
      <section className="services-banner">
        <Slider />
      </section>

      {/* Listing Section */}
      <ListingsSection />

      {/* Listing Review */}
      <ReviewSection />
    </div>
  );
};

export default Home;