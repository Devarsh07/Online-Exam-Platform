// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const Dashboard = () => {
// //   const [exams, setExams] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchExams = async () => {
// //       try {
// //         const res = await axios.get("/api/exams");
// //         setExams(res.data);
// //       } catch (error) {
// //         console.error("Error fetching exams:", error);
// //       }
// //     };
// //     fetchExams();
// //   }, []);

// //   const handleStartExam = (examId) => {
// //     navigate(`/exam/${examId}`);
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h2 className="text-2xl font-bold mb-4">Available Exams</h2>
// //       {exams.length === 0 ? (
// //         <p>No exams available.</p>
// //       ) : (
// //         <ul>
// //           {exams.map((exam) => (
// //             <li key={exam._id} className="border p-4 mb-2 rounded-lg">
// //               <h3 className="text-lg font-semibold">{exam.title}</h3>
// //               <p>Duration: {exam.duration} minutes</p>
// //               <button
// //                 onClick={() => handleStartExam(exam._id)}
// //                 className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
// //               >
// //                 Start Exam
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;




// //new

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaClock, FaEdit } from "react-icons/fa"; // Importing icons

// const Dashboard = () => {
//   const [exams, setExams] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         const token = localStorage.getItem('user'); // Retrieve token
//         localStorage.removeItem("examSessionId"); // ✅ Remove session ID
//         //console.log(token);
//         const res = await axios.get("http://localhost:5000/api/exams", {
//           headers: {
//               Authorization: `Bearer ${token}` // Attach token
//           }
//       });
//         console.log("Exams:", res.data);
//         setExams(res.data);
//       } catch (error) {
//         console.error("Error fetching exams:", error);
//       }
//     };
//     fetchExams();
//   }, []);

//   const handleStartExam = (examId) => {
//     navigate(`/exam/${examId}`);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center mb-6">📚 Available Exams</h2>
//       {exams.length === 0 ? (
//         <p className="text-center text-gray-600">No exams available.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {exams.map((exam) => (
//             <div key={exam._id} className="bg-white shadow-lg rounded-lg p-5 border">
//               <h3 className="text-xl font-semibold mb-2">{exam.title}</h3>
//               <p className="text-gray-600 flex items-center">
//                 <FaClock className="mr-2 text-blue-500" /> {exam.duration} minutes
//               </p>
//               <button
//                 onClick={() => handleStartExam(exam._id)}
//                 className="bg-blue-600 text-white px-5 py-2 mt-3 rounded-lg flex items-center hover:bg-blue-700 transition"
//               >
//                 <FaEdit className="mr-2" /> Start Exam
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaClock, FaEdit } from "react-icons/fa"; // Importing icons
// import Navbar from "../components/layout/Navbaar";

// const Dashboard = () => {
//   const [exams, setExams] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         const token = localStorage.getItem('user'); // Retrieve token
//         localStorage.removeItem("examSessionId"); // ✅ Remove session ID
//         //console.log(token);
//         const res = await axios.get("http://localhost:5000/api/exams", {
//           headers: {
//               Authorization: `Bearer ${token}` // Attach token
//           }
//       });
//         console.log("Exams:", res.data);
//         setExams(res.data);
//       } catch (error) {
//         console.error("Error fetching exams:", error);
//       }
//     };
//     fetchExams();
//   }, []);

//   const handleStartExam = (examId) => {
//     navigate(`/exam/${examId}`);
//   };

//   const handleViewResults = () => {
//     navigate("/results");
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <Navbar/>
//       <h2 className="text-3xl font-bold text-center mb-6">📚 Available Exams</h2>
//       <button
//         onClick={handleViewResults}
//         className="bg-green-600 text-white px-5 py-2 mb-6 rounded-lg hover:bg-green-700 transition"
//       >
//         View Results
//       </button>
//       {exams.length === 0 ? (
//         <p className="text-center text-gray-600">No exams available.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {exams.map((exam) => (
//             <div key={exam._id} className="bg-white shadow-lg rounded-lg p-5 border">
//               <h3 className="text-xl font-semibold mb-2">{exam.title}</h3>
//               <p className="text-gray-600 flex items-center">
//                 <FaClock className="mr-2 text-blue-500" /> {exam.duration} minutes
//               </p>
//               <button
//                 onClick={() => handleStartExam(exam._id)}
//                 className="bg-blue-600 text-white px-5 py-2 mt-3 rounded-lg flex items-center hover:bg-blue-700 transition"
//               >
//                 <FaEdit className="mr-2" /> Start Exam
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

//new 

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaClock, FaEdit } from "react-icons/fa";
import Navbar from "../components/layout/Navbar";

const Dashboard = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // parse the JSON string
        const token = user?.token; // safe check
        localStorage.removeItem("examSessionId");
        const res = await axios.get("http://localhost:5000/api/exams", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExams(res.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };
    fetchExams();
  }, []);

  const handleStartExam = (examId) => {
    navigate(`/exam/${examId}`);
  };

  const handleViewResults = () => {
    navigate("/results");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Navbar at the top */}
      <Navbar />

      {/* Content with padding to avoid navbar overlap */}
      <div className="container mx-auto p-6 pt-24">
        <h2 className="text-3xl font-bold text-center mb-6">📚 Available Exams</h2>
        <button
          onClick={handleViewResults}
          className="bg-green-600 text-white px-5 py-2 mb-6 rounded-lg hover:bg-green-700 transition"
        >
          View Results
        </button>
        {exams.length === 0 ? (
          <p className="text-center text-gray-600">No exams available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div key={exam._id} className="bg-white shadow-lg rounded-lg p-5 border">
                <h3 className="text-xl font-semibold mb-2">{exam.title}</h3>
                <p className="text-gray-600 flex items-center">
                  <FaClock className="mr-2 text-blue-500" /> {exam.duration} minutes
                </p>
                <button
                  onClick={() => handleStartExam(exam._id)}
                  className="bg-blue-600 text-white px-5 py-2 mt-3 rounded-lg flex items-center hover:bg-blue-700 transition"
                >
                  <FaEdit className="mr-2" /> Start Exam
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
