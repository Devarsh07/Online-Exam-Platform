// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
//       <h1 className="text-xl font-bold">ExamMaster</h1>
//       <div className="space-x-6">
//         <a href="#" className="text-gray-700">About Us</a>
//         <a href="#" className="text-gray-700">Contact</a>
//       </div>
//       <div className="space-x-4">
//         <button 
//           className="px-4 py-2 border rounded"
//           onClick={() => navigate("/login")}
//         >
//           Log In
//         </button>
//         <button 
//           className="px-4 py-2 bg-black text-white rounded"
//           onClick={() => navigate("/signup")}
//         >
//           Sign Up
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

//new

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow-md py-4 px-10 flex justify-between items-center z-50">
      {/* Logo */}
      <h1 className="text-xl font-bold">
        <Link to="/" className="hover:text-blue-600 transition">ExamMaster</Link>
      </h1>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">About Us</Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">Contact</Link>
      </div>

      {/* Auth Buttons */}
      <div className="space-x-4">
        <button 
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
        <button 
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
