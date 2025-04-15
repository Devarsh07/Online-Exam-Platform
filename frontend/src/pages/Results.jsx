import { useEffect, useState } from "react";
import axios from "axios";
import Navabr from "../components/layout/Navbar"

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
         // Retrieve token
         const user = JSON.parse(localStorage.getItem("user")); // parse the JSON string
        const token = user?.token; // safe check
        const res = await axios.get("http://localhost:5000/api/exams/results",  {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(res.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };
    fetchResults();
  }, []);

  return (
    <div>
      <Navabr/>
    <div className="container mx-auto p-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">Exam Results</h2>
      {results.length === 0 ? (
        <p>No results available.</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result._id} className="border p-4 mb-2 rounded-lg">
              <h3 className="text-lg font-semibold">Exam: {result.examId?.title || "Unknown"}</h3>
              <p>Score: {result.score} / {result.totalQuestions}</p>
              <p>Percentage: {result.percentage}%</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default Results;
