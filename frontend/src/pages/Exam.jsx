
//new code scrolling also

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Exam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  const [fullscreenCountdown, setFullscreenCountdown] = useState(10);
  const fullscreenTimerRef = useRef(null);
  const examContainerRef = useRef(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // parse the JSON string
        const token = user?.token; // safe check
        const res = await axios.post(
          `http://localhost:5000/api/exams/start/${examId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setExam(res.data);
        localStorage.setItem("examSessionId", res.data.examSessionId);

        const endTime = new Date(res.data.endTime).getTime();
        const currentTime = new Date().getTime();
        const remainingTime = Math.max((endTime - currentTime) / 1000, 0);
        setTimeLeft(remainingTime);

        setTimeout(() => {
          requestFullscreen();
        }, 500);
      } catch (error) {
        console.error("Error fetching exam:", error);
      }
    };

    fetchExam();
  }, [examId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    if (submitted) return;

    try {
      const examSessionId = localStorage.getItem("examSessionId");
      localStorage.removeItem("examSessionId");
      const user = JSON.parse(localStorage.getItem("user")); // parse the JSON string
      const token = user?.token; 

      // const response = await axios.post(
      //   `http://localhost:5000/api/exams/submit/${examSessionId}`,
      //   { answers },
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );


      const response = await axios.post(`http://localhost:5000/api/exams/submit/${examSessionId}`,answers,{
        headers: { Authorization: `Bearer ${token}` }
      });

      setSubmitted(true);
      const { certificateUrl } = response.data;

      if (certificateUrl) {
        window.open(certificateUrl, "_blank");
      }

      navigate("/results", { replace: true });

      window.onpopstate = () => {
        navigate("/student/dashboard", { replace: true });
      };
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  const requestFullscreen = () => {
    if (examContainerRef.current) {
      if (examContainerRef.current.requestFullscreen) {
        examContainerRef.current.requestFullscreen().catch((err) => {
          console.error("Error entering fullscreen:", err);
        });
      } else if (examContainerRef.current.webkitRequestFullscreen) {
        examContainerRef.current.webkitRequestFullscreen();
      } else if (examContainerRef.current.mozRequestFullScreen) {
        examContainerRef.current.mozRequestFullScreen();
      } else if (examContainerRef.current.msRequestFullscreen) {
        examContainerRef.current.msRequestFullscreen();
      }
    }
  };

  useEffect(() => {
    let countdownInterval;

    const handleFullscreenChange = () => {
      const isFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      if (!isFullscreen) {
        setShowFullscreenWarning(true);
        setFullscreenCountdown(10);

        countdownInterval = setInterval(() => {
          setFullscreenCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              fullscreenTimerRef.current = null;
              handleSubmit();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        fullscreenTimerRef.current = countdownInterval;
      } else {
        setShowFullscreenWarning(false);
        if (fullscreenTimerRef.current) {
          clearInterval(fullscreenTimerRef.current);
          fullscreenTimerRef.current = null;
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);

      if (fullscreenTimerRef.current) {
        clearInterval(fullscreenTimerRef.current);
      }
    };
  }, []);

  if (!exam) return <p>Loading exam...</p>;

  return (
    <div
      ref={examContainerRef}
      className="container mx-auto p-4 bg-white relative overflow-y-auto h-screen"
    >
      <h2 className="text-2xl font-bold mb-4">{exam.title}</h2>

      <p className="text-red-500 font-semibold">
        Time Left: {timeLeft !== null ? `${Math.floor(timeLeft)} seconds` : "Loading..."}
      </p>

      {exam.questions.map((q) => (
        <div key={q._id} className="mb-6 p-4 border rounded-lg bg-gray-100">
          <p className="font-semibold text-lg mb-2">{q.questionText}</p>
          <div className="space-y-2">
            {q.options.map((option, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-200 rounded-md transition"
              >
                <input
                  type="radio"
                  name={q._id}
                  value={option}
                  checked={answers[q._id] === option}
                  onChange={() => handleAnswerChange(q._id, option)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-800">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        disabled={submitted}
      >
        {submitted ? "Submitted" : "Submit Exam"}
      </button>

      {showFullscreenWarning && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 text-white flex flex-col items-center justify-center z-50 text-center p-8">
          <h1 className="text-3xl font-bold mb-4">🚨 FULLSCREEN EXITED 🚨</h1>
          <p className="text-lg mb-2">
            Go back to fullscreen or your test will be auto-submitted!
          </p>
          <p className="text-red-400 text-xl font-mono mb-4">
            Time left: {fullscreenCountdown}s
          </p>
          <button
            onClick={requestFullscreen}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Go Back to Fullscreen
          </button>
        </div>
      )}
    </div>
  );
};

export default Exam;
