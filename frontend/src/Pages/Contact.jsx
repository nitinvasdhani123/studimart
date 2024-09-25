import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">Contact Us</h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          If you have any questions, feel free to reach out to us through the form below or visit us at our office.
        </p>
        <div className="flex flex-wrap gap-8 justify-between">
          {/* Contact Form */}
          <div className="flex-1 min-w-[320px] bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-orange-500 mb-6">Send Us a Message</h3>
            <form>
              <div className="mb-5">
                <input
                  type="text"
                  className="w-full p-4 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  className="w-full p-4 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-5">
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  placeholder="Your Message"
                  rows="5"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
          {/* Contact Information */}
          <div className="flex-1 min-w-[320px] bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-orange-500 mb-6">Our Office</h3>
            <p className="text-gray-700 mb-4">1234 Street Name, City, Country</p>
            <p className="text-gray-700 mb-4">Email: info@example.com</p>
            <p className="text-gray-700 mb-4">Phone: +123 456 7890</p>
            <div className="flex gap-4 mb-6">
              <a href="#" className="text-white bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-white bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509489!2d144.95373531531568!3d-37.81621897975154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f44f5fb1%3A0x2a77c5b5e4b79e70!2s1234%20Street%20Name%2C%20City!5e0!3m2!1sen!2s!4v1635761063834!5m2!1sen!2s"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
