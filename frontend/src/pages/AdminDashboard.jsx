


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



