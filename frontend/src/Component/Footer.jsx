import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12 border-t border-gray-300">
      <div className="container mx-auto max-w-screen-xl px-6">
        <div className="flex flex-wrap gap-12">
          {/* Branding Section */}
          <div className="flex-1 min-w-[250px]">
            <h3 className="text-3xl text-orange-600 mb-4">StudiMart</h3>
            <p className="text-base text-gray-600 mb-3">
              Stay updated with the latest products and deals. Subscribe to our newsletter:
            </p>
            <form className="flex mt-3">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="border border-gray-300 rounded-l-full py-3 px-4 flex-1 outline-none max-w-[250px] focus:ring-2 focus:ring-orange-500 transition duration-200"
              />
              <button
                type="submit"
                className="bg-orange-600 text-white rounded-r-full py-3 px-6 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap gap-8 flex-1 min-w-[250px]">
            {/* Company Links */}
            <div className="min-w-[150px]">
              <h4 className="text-lg text-orange-600 mb-3">Company</h4>
              <ul className="list-none p-0 space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition duration-200">Home</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition duration-200">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition duration-200">Pricing</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition duration-200">Team</a>
                </li>
              </ul>
            </div>

            {/* Documentation Links */}
            <div className="min-w-[150px]">
              <h4 className="text-lg text-orange-600 mb-3">Documentation</h4>
              <ul className="list-none p-0 space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition duration-200">Help Center</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition duration-200">FAQ</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition duration-200">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition duration-200">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="min-w-[150px]">
              <h4 className="text-lg text-orange-600 mb-3">Social</h4>
              <ul className="list-none p-0 space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition duration-200">Facebook</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition duration-200">Instagram</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition duration-200">YouTube</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition duration-200">Twitter</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between border-t border-gray-300 mt-8 pt-6 text-sm text-gray-600">
          <p>© 2024 StudiMart. All Rights Reserved.</p>
          <p>
            <a href="#" className="hover:underline transition duration-200">Terms &amp; Conditions</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
