import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // Toggle dropdown menu
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
    };

    if (isDropdownOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Fetch user profile from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.post("http://localhost:8080/user/profile", { token }); // Send as JSON
          if (response.data && response.data.user) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, []);

  return (
    <nav className="bg-white text-black shadow-md fixed w-full z-50 top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-orange-600">StudiMart</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Links and Buttons */}
        <div
          className={`md:flex md:items-center md:w-auto ${
            isMenuOpen ? "block" : "hidden"
          } w-full`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 md:mt-0 mt-4">
            {/* Home */}
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-black hover:text-orange-600"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>

            {/* About Us */}
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-black hover:text-orange-600"
                onClick={toggleMenu}
              >
                About Us
              </Link>
            </li>

            {/* Products */}
            <li>
              <Link
                to="/products"
                className="block py-2 px-3 text-black hover:text-orange-600"
                onClick={toggleMenu}
              >
                Products
              </Link>
            </li>

            {/* Blog */}
            <li>
              <Link
                to="/blog"
                className="block py-2 px-3 text-black hover:text-orange-600"
                onClick={toggleMenu}
              >
                Blog
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-black hover:text-orange-600"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>

            {/* If user is logged in, show profile dropdown */}
            {user ? (
              <li className="relative">
                <button
                  className="block py-2 px-4 text-black focus:outline-none flex items-center space-x-2"
                  onClick={toggleDropdown}
                >
                  <img
                    src={`http://localhost:8080/${user.pic}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link
                      to="/user/profile/edit"
                      className="block px-4 py-2 text-black hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/user/products"
                      className="block px-4 py-2 text-black hover:bg-gray-100"
                    >
                      Your Products
                    </Link>
                    <Link
                      to="/password-reset"
                      className="block px-4 py-2 text-black hover:bg-gray-100"
                    >
                      Reset Password
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                      onClick={() => {
                        localStorage.removeItem("token");
                        setUser(null);
                        navigate("/");
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </li>
            ) : (
              // Show login button if no user is logged in
              <li>
                <button
                  className="block py-2 px-4 text-black hover:text-orange-600 focus:outline-none"
                  onClick={() => navigate("/login")}
                >
                  <i className="fas fa-user"></i> Login
                </button>
              </li>
            )}

            {/* Post Ad Button */}
            {/* <li>
              <Link
                to="/addproduct"
                className="block py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                onClick={toggleMenu}
              >
                <i className="fas fa-plus-circle"></i> Post Ad
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;