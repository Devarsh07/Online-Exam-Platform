import axios from "axios";
import { useState } from "react";
import Navbar from "../components/layout/Navbar"

const createExam = () => {
  const [showForm, setShowForm] = useState(false);
  const [exam, setExam] = useState({
    title: "",
    description: "",
    duration: "",
    questions: [
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ],
  });

  const handleChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...exam.questions];
    newQuestions[index][field] = value;
    setExam({ ...exam, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...exam.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setExam({ ...exam, questions: newQuestions });
  };

  const addQuestion = () => {
    setExam({
      ...exam,
      questions: [...exam.questions, { questionText: "", options: ["", "", "", ""], correctAnswer: "" }],
    });
  };

  const handleSubmit = async () => {
    try {
         // Retrieve token
         const user = JSON.parse(localStorage.getItem("user")); // parse the JSON string
        const token = user?.token; // safe check
        const response = await axios.post("http://localhost:5000/api/exams/", exam, {
          headers: { Authorization: `Bearer ${token}` },
        });
          console.log("Exam Created:", response.data);
          setShowForm(false);
    } catch (error) {
      console.error("Error creating exam:", error);
    }
  };

  return (
    <div className="p-6">
    <Navbar></Navbar>
    <div className="mt-20">
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Create Exam
      </button>
      </div>
      {showForm && (
        <div className="mt-4 border p-4 rounded-lg">
          <input
            type="text"
            name="title"
            placeholder="Exam Title"
            value={exam.title}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={exam.description}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (in minutes)"
            value={exam.duration}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />

          {exam.questions.map((q, qIndex) => (
            <div key={qIndex} className="border p-3 rounded-lg mb-2">
              <input
                type="text"
                placeholder="Question"
                value={q.questionText}
                onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                className="border p-2 w-full mb-2"
              />
              {q.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2 mb-1">
                  <input
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="border p-2 w-full"
                  />
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correctAnswer === option}
                    onChange={() => handleQuestionChange(qIndex, "correctAnswer", option)}
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            onClick={addQuestion}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            + Add Question
          </button>
          <button
            onClick={handleSubmit}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Create Exam
          </button>
        </div>
      )}
    </div>
  );
};

export default createExam;