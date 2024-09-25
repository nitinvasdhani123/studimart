// Hero.js
import React from 'react';

const Hero = () => {
  return (
    <section
      className="relative bg-gray-50 h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url(https://images.pexels.com/photos/998591/pexels-photo-998591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
      }}
    >
      {/* Overlay for Better Text Visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Search Bar */}
      <div className="relative z-30 flex flex-col md:flex-row justify-center items-center mt-5 w-full max-w-5xl gap-4 px-4">
        {/* Keyword Input */}
        <div className="flex items-center bg-white rounded-full px-5 py-3 shadow-md w-full max-w-lg focus-within:ring-2 focus-within:ring-orange-500">
          <i className="fas fa-search text-gray-500 mr-3 text-lg" />
          <input
            type="text"
            placeholder="Enter Keyword or Category"
            className="bg-transparent outline-none text-base text-gray-700 placeholder-gray-500 w-full p-2"
          />
        </div>

        {/* Location Input */}
        <div className="flex items-center bg-white rounded-full px-5 py-3 shadow-md w-full max-w-lg focus-within:ring-2 focus-within:ring-orange-500">
          <i className="fas fa-map-marker-alt text-gray-500 mr-3 text-lg" />
          <input
            type="text"
            placeholder="Enter Location"
            className="bg-transparent outline-none text-base text-gray-700 placeholder-gray-500 w-full p-2"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-orange-500 text-white rounded-full py-3 px-8 hover:bg-orange-600 shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Hero;
