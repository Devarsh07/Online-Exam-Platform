// import { FaUsers, FaGraduationCap, FaTrophy, FaClock } from "react-icons/fa";

// const Home = () => {
//   return (
//     <div className="container mx-auto p-6">
//       {/* Hero Section */}
//       <div className="text-center my-12">
//         <h1 className="text-4xl font-bold">Welcome to ExamMaster</h1>
//         <p className="text-lg text-gray-600 mt-4">
//           Your trusted platform for online examinations and assessment management.
//         </p>
//       </div>

//       {/* Status Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
//         <div className="bg-white shadow-lg p-6 rounded-lg">
//           <FaUsers className="text-4xl text-blue-500 mx-auto" />
//           <h3 className="text-xl font-bold mt-2">100,000+</h3>
//           <p className="text-gray-600">Active Students</p>
//         </div>
//         <div className="bg-white shadow-lg p-6 rounded-lg">
//           <FaGraduationCap className="text-4xl text-green-500 mx-auto" />
//           <h3 className="text-xl font-bold mt-2">5,000+</h3>
//           <p className="text-gray-600">Exams Conducted</p>
//         </div>
//         <div className="bg-white shadow-lg p-6 rounded-lg">
//           <FaTrophy className="text-4xl text-yellow-500 mx-auto" />
//           <h3 className="text-xl font-bold mt-2">95%</h3>
//           <p className="text-gray-600">Success Rate</p>
//         </div>
//         <div className="bg-white shadow-lg p-6 rounded-lg">
//           <FaClock className="text-4xl text-red-500 mx-auto" />
//           <h3 className="text-xl font-bold mt-2">24/7</h3>
//           <p className="text-gray-600">Support Available</p>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="mt-12 text-center bg-gray-100 py-6">
//         <h2 className="text-2xl font-bold">ExamMaster</h2>
//         <p className="text-gray-600">Your trusted platform for online examinations</p>
//         <div className="mt-4">
//           <p className="font-semibold">Contact Us</p>
//           <p>123 Exam Street, Learning City, 12345</p>
//           <p>+1 (234) 567-890</p>
//           <p>info@exammaster.com</p>
//         </div>
//         <div className="mt-4 flex justify-center gap-4 text-gray-600">
//           <span>About Us</span>
//           <span>Contact</span>
//           <span>Privacy Policy</span>
//           <span>Terms of Service</span>
//         </div>
//         <p className="text-gray-500 mt-4">&copy; 2025 ExamMaster. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;


//new one

// import React from "react";

// const Home = () => {
//   return (
//     <div className="min-h-screen w-full font-sans">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
//         <h1 className="text-xl font-bold">ExamMaster</h1>
//         <div className="space-x-6">
//           <a href="#" className="text-gray-700">About Us</a>
//           <a href="#" className="text-gray-700">Contact</a>
//         </div>
//         <div className="space-x-4">
//           <button className="px-4 py-2 border rounded">Log In</button>
//           <button className="px-4 py-2 bg-black text-white rounded">Sign Up</button>
//         </div>
//       </nav>
      
//       {/* Hero Section */}
//       <section className="flex items-center justify-between px-10 py-20 bg-gradient-to-r from-gray-100 to-white">
//         <div>
//           <h2 className="text-5xl font-bold leading-tight">
//             Master Your Future <br /> with Online Examinations
//           </h2>
//           <p className="text-gray-600 mt-4 max-w-lg">
//             Join thousands of students and institutions using our platform for online exams.
//           </p>
//         </div>
//         <img src="/hero-image.jpg" alt="Students on Laptop" className="w-1/2 rounded-xl shadow-lg" />
//       </section>
      
//       {/* Stats Section */}
//       <section className="py-16 bg-gray-50 text-center">
//         <h3 className="text-2xl font-bold">Trusted by Students and Institutions Nationwide</h3>
//         <div className="grid grid-cols-4 gap-8 mt-8 px-10">
//           <div className="bg-white shadow-md p-6 rounded-lg">
//             <p className="text-2xl font-bold">100,000+</p>
//             <p className="text-gray-600">Active Students</p>
//           </div>
//           <div className="bg-white shadow-md p-6 rounded-lg">
//             <p className="text-2xl font-bold">5,000+</p>
//             <p className="text-gray-600">Exams Conducted</p>
//           </div>
//           <div className="bg-white shadow-md p-6 rounded-lg">
//             <p className="text-2xl font-bold">95%</p>
//             <p className="text-gray-600">Success Rate</p>
//           </div>
//           <div className="bg-white shadow-md p-6 rounded-lg">
//             <p className="text-2xl font-bold">24/7</p>
//             <p className="text-gray-600">Support Available</p>
//           </div>
//         </div>
//       </section>
      
//       {/* Footer */}
//       <footer className="bg-gray-100 py-10 px-10 flex justify-between">
//         <div>
//           <h4 className="text-xl font-bold">ExamMaster</h4>
//           <p className="text-gray-600">Your trusted platform for online examinations.</p>
//         </div>
//         <div>
//           <h5 className="font-semibold">Contact Us</h5>
//           <p className="text-gray-600">123 Exam Street, Learning City</p>
//           <p className="text-gray-600">info@exammaster.com</p>
//         </div>
//         <div>
//           <h5 className="font-semibold">Quick Links</h5>
//           <p className="text-gray-600">About Us</p>
//           <p className="text-gray-600">Privacy Policy</p>
//         </div>
//         <div>
//           <h5 className="font-semibold">Follow Us</h5>
//           <div className="flex space-x-4">
//             <span>🔵</span> <span>🐦</span> <span>📸</span>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;



//after login and signup dynamic

import React from "react";
import Navbar from "../components/layout/Navbar"
import { useNavigate } from "react-router-dom";
import {  useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  // use effect to fetch token from local storage and navigate accordingly

  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem('token'));
  
  //   if (token) {
  //     if (token.role === "student") {
  //       console.log("Student");
  //       navigate("/login");
  //     } else if (token.role === "admin") {
  //       navigate("/admin/dashboard");
  //     }
  //   }
  // }, [navigate]);


  return (
    <div className="min-h-screen w-full font-sans">
      {/* Navbar */}
      <Navbar/>
      {/* <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">ExamMaster</h1>
        <div className="space-x-6">
          <a href="#" className="text-gray-700">About Us</a>
          <a href="#" className="text-gray-700">Contact</a>
        </div>
        <div className="space-x-4">
          <button 
            className="px-4 py-2 border rounded"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
          <button 
            className="px-4 py-2 bg-black text-white rounded"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </nav> */}
      
      {/* Hero Section */}
      <section className="flex items-center justify-between px-10 py-20 bg-gradient-to-r from-gray-100 to-white">
        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Master Your Future <br /> with Online Examinations
          </h2>
          <p className="text-gray-600 mt-4 max-w-lg">
            Join thousands of students and institutions using our platform for online exams.
          </p>
        </div>
        <img src="https://static.vecteezy.com/system/resources/previews/003/296/458/non_2x/high-school-university-student-take-online-exam-using-laptop-free-vector.jpg" alt="Students on Laptop" className="w-1/2 rounded-xl shadow-lg mt-8" />
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50 text-center">
        <h3 className="text-2xl font-bold">Trusted by Students and Institutions Nationwide</h3>
        <div className="grid grid-cols-4 gap-8 mt-8 px-10">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <p className="text-2xl font-bold">100,000+</p>
            <p className="text-gray-600">Active Students</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <p className="text-2xl font-bold">5,000+</p>
            <p className="text-gray-600">Exams Conducted</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <p className="text-2xl font-bold">95%</p>
            <p className="text-gray-600">Success Rate</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <p className="text-2xl font-bold">24/7</p>
            <p className="text-gray-600">Support Available</p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-10 px-10 flex justify-between">
        <div>
          <h4 className="text-xl font-bold">ExamMaster</h4>
          <p className="text-gray-600">Your trusted platform for online examinations.</p>
        </div>
        <div>
          <h5 className="font-semibold">Contact Us</h5>
          <p className="text-gray-600">123 Exam Street, Learning City</p>
          <p className="text-gray-600">info@exammaster.com</p>
        </div>
        <div>
          <h5 className="font-semibold">Quick Links</h5>
          <p className="text-gray-600">About Us</p>
          <p className="text-gray-600">Privacy Policy</p>
        </div>
        <div>
          <h5 className="font-semibold">Follow Us</h5>
          <div className="flex space-x-4">
            <span>🔵</span> <span>🐦</span> <span>📸</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
