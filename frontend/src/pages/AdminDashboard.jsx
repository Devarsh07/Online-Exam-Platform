// import axios from "axios";
// import { useState } from "react";

// const AdminDashboard = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [exam, setExam] = useState({
//     title: "",
//     description: "",
//     duration: "",
//     questions: [
//       { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
//     ],
//   });

//   const handleChange = (e) => {
//     setExam({ ...exam, [e.target.name]: e.target.value });
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const newQuestions = [...exam.questions];
//     newQuestions[index][field] = value;
//     setExam({ ...exam, questions: newQuestions });
//   };

//   const handleOptionChange = (qIndex, oIndex, value) => {
//     const newQuestions = [...exam.questions];
//     newQuestions[qIndex].options[oIndex] = value;
//     setExam({ ...exam, questions: newQuestions });
//   };

//   const addQuestion = () => {
//     setExam({
//       ...exam,
//       questions: [...exam.questions, { questionText: "", options: ["", "", "", ""], correctAnswer: "" }],
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//         const token = localStorage.getItem("user"); // Retrieve token
//         const response = await axios.post("http://localhost:5000/api/exams/", exam, {
//             headers: {
//                 Authorization: `Bearer ${token}` // Attach token
//             },
//           });
//           console.log("Exam Created:", response.data);
//           setShowForm(false);
//     } catch (error) {
//       console.error("Error creating exam:", error);
//     }
//   };

//   return (
//     <div className="p-6">

//     <div className="mt-20">
//       <button
//         onClick={() => setShowForm(!showForm)}
//         className="px-4 py-2 bg-blue-500 text-white rounded-md"
//       >
//         Create Exam
//       </button>
//       </div>
//       {showForm && (
//         <div className="mt-4 border p-4 rounded-lg">
//           <input
//             type="text"
//             name="title"
//             placeholder="Exam Title"
//             value={exam.title}
//             onChange={handleChange}
//             className="border p-2 w-full mb-2"
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={exam.description}
//             onChange={handleChange}
//             className="border p-2 w-full mb-2"
//           />
//           <input
//             type="number"
//             name="duration"
//             placeholder="Duration (in minutes)"
//             value={exam.duration}
//             onChange={handleChange}
//             className="border p-2 w-full mb-2"
//           />

//           {exam.questions.map((q, qIndex) => (
//             <div key={qIndex} className="border p-3 rounded-lg mb-2">
//               <input
//                 type="text"
//                 placeholder="Question"
//                 value={q.questionText}
//                 onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
//                 className="border p-2 w-full mb-2"
//               />
//               {q.options.map((option, oIndex) => (
//                 <div key={oIndex} className="flex items-center gap-2 mb-1">
//                   <input
//                     type="text"
//                     placeholder={`Option ${oIndex + 1}`}
//                     value={option}
//                     onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
//                     className="border p-2 w-full"
//                   />
//                   <input
//                     type="radio"
//                     name={`correct-${qIndex}`}
//                     checked={q.correctAnswer === option}
//                     onChange={() => handleQuestionChange(qIndex, "correctAnswer", option)}
//                   />
//                 </div>
//               ))}
//             </div>
//           ))}
//           <button
//             onClick={addQuestion}
//             className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md"
//           >
//             + Add Question
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
//           >
//             Create Exam
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;


//new

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/Navbar"; // Import Navbar

const AdminDashboard = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("user");
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

  const handleCreateExam = () => {
    navigate("/createExam");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Navbar at the top */}
      <Navbar />

      {/* Content with padding to prevent overlap */}
      <div className="container mx-auto p-6 pt-24">
        <h2 className="text-3xl font-bold text-center mb-6">📋 Admin Dashboard</h2>

        {/* Create Exam Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleCreateExam}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            + Create Exam
          </button>
        </div>

        {/* Exam List */}
        {exams.length === 0 ? (
          <p className="text-center text-gray-600">No exams created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div key={exam._id} className="bg-white shadow-lg rounded-lg p-5 border">
                <h3 className="text-xl font-semibold mb-2">{exam.title}</h3>
                <p className="text-gray-600">{exam.duration} minutes</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;



