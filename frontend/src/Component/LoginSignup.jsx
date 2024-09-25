// import React, { useState } from "react";

// const LoginSignup = ({ isOpen, onClose }) => {
//   const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup
//   const [formData, setFormData] = useState({
//     name: "",
//     number: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Form validation
//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name && !isLogin) errors.name = "Name is required";
//     if (!formData.number && !isLogin) errors.number = "Number is required";
//     if (!formData.email) errors.email = "Email is required";
//     if (!formData.password) errors.password = "Password is required";

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       // Handle form submission logic here (e.g., API call)
//       console.log("Form submitted:", formData);
//       onClose(); // Close the modal after successful submission
//     }
//   };

//   return (
//     <div
//       className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${
//         isOpen ? "opacity-100 visible" : "opacity-0 invisible"
//       }`}
//     >
//       <div className="relative bg-white rounded-lg w-96 p-6 shadow-lg">
//         {/* Close Button */}
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//           onClick={onClose} // Close modal on click
//         >
//           &times;
//         </button>

//         {/* Toggle between Login and Signup */}
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold text-orange-500 mb-2">
//             {isLogin ? "Login" : "Sign Up"}
//           </h2>
//           <p className="text-gray-600">
//             {isLogin ? "Welcome back! Please login." : "Create a new account."}
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <>
//               {/* Name Input */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-medium mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   placeholder="Enter your name"
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//                 )}
//               </div>

//               {/* Number Input */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-medium mb-1">
//                   Number
//                 </label>
//                 <input
//                   type="number"
//                   name="number"
//                   value={formData.number}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   placeholder="Enter your number"
//                 />
//                 {errors.number && (
//                   <p className="text-red-500 text-xs mt-1">{errors.number}</p>
//                 )}
//               </div>
//             </>
//           )}

//           {/* Email Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//             )}
//           </div>

//           {/* Password Input */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-medium mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Enter your password"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors"
//           >
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         {/* Toggle between Login and Signup */}
//         <div className="mt-4 text-center">
//           <button
//             className="text-orange-500 hover:underline"
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? "Create an account" : "Already have an account? Login"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;
