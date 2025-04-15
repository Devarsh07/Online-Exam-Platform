const express = require("express");
const auth = require("../middleware/auth");
const Exam = require("../models/Exam");
const ExamSession = require("../models/ExamSession");
const User = require("../models/User");
const Result = require("../models/Result");
const mongoose = require("mongoose");
const path = require('path');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const uploadToS3 = require('../utils/uploadToS3'); 

const router = express.Router();

// Get exam results (Students only)
router.get("/results", auth, async (req, res) => {
    //console.log("inn resulr")
    if (req.user.role !== "student") {
        return res.status(403).json({ msg: "Access denied" });
    }

    try {
        //console.log(req.user.userId);
        const results = await Result.find({ userId: req.user.userId }).populate("examId", "title description");
        res.json(results);
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ msg: "Server error" });
    }
});

// ✅ Get a single exam by ID
router.get("/:examId", auth, async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId);
        if (!exam) return res.status(404).json({ msg: "Exam not found" });

        res.json(exam);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

// Create an exam (Admin and Examiner only)
router.post("/", auth, async (req, res) => {
    console.log(req.user.role);
    if (req.user.role !== "admin" && req.user.role !== "examiner") {
        return res.status(403).json({ msg: "Access denied" });
    }

    try {
        const { title, description, duration, questions, correctAnswers } = req.body;

        const newExam = new Exam({
            title,
            description,
            duration,
            questions,
            correctAnswers // Include correctAnswers
        });

        await newExam.save();
        res.status(201).json({ msg: "Exam created successfully", exam: newExam });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ msg: "Server error" });
    }
});

// Get all exams (Students & Examiners)
router.get("/", auth, async (req, res) => {
    //console.log("Hello");
    try {
        const exams = await Exam.find({}, { "questions.correctAnswer": 0 }); // Hide correct answers
        //console.log(exams);
        res.json(exams);
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ msg: "Server error" });
    }
});

// Start an exam (Only for students)
router.post("/start/:examId", auth, async (req, res) => {
    //console.log("Huehue Mai aagya");
    if (req.user.role !== "student") {
        return res.status(403).json({ msg: "Access denied" });
    }

    const examId = new mongoose.Types.ObjectId(req.params.examId);

    if (!mongoose.Types.ObjectId.isValid(examId)) {
        return res.status(400).json({ error: "Invalid examId format" });
    }

    console.log("Valid object id");

    //console.log(examId);

    try {
        
        
        const exam = await Exam.aggregate([
            { $match: { _id: examId } }, 
            { $unwind: "$questions" },
            { $sample: { size: 10 } }, // Adjust size as needed
            { $group: { _id: "$_id", questions: { $push: "$questions" }, title: { $first: "$title" }, duration: { $first: "$duration" } } }
        ]);

        console.log("here aagya");
        
        if (!exam) return res.status(404).json({ msg: "Exam not found" });

        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + exam[0].duration * 60000);

        const examSession = new ExamSession({
            userId: req.user.userId,
            examId: exam[0]._id,
            startTime,
            endTime,
        });

        await examSession.save();

        res.status(200).json({ 
            msg: "Exam started", 
            examSessionId: examSession._id, 
            startTime, 
            endTime, 
            questions: exam[0].questions 
        });

    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ msg: "Server error" });
    }
});



// Submit an exam with grading
// router.post("/submit/:examSessionId", auth, async (req, res) => {
//     if (req.user.role !== "student") {
//         return res.status(403).json({ msg: "Access denied" });
//     }

//     try {

//         //console.log("Heree")
//         const examSession = await ExamSession.findById(req.params.examSessionId);
//         if (!examSession) return res.status(404).json({ msg: "Exam session not found" });

//         const exam = await Exam.findById(examSession.examId);
//         if (!exam) return res.status(404).json({ msg: "Exam not found" });

//         const currentTime = new Date();
//         if (currentTime > examSession.endTime) {
//             return res.status(400).json({ msg: "Time expired. Auto-submitting exam." });
//         }

//         const { answers } = req.body;
        
//         const calculateScore = (questions, studentAnswers) => {
//             let score = 0;
        
//             questions.forEach(question => {
//                 const questionId = question._id.toString(); // Convert ObjectId to string
//                 if (studentAnswers[questionId] && studentAnswers[questionId] === question.correctAnswer) {
//                     score++; // Increase score if answer matches
//                 }
//             });
        
//             return score;
//         };

//         if (!answers) {
//             return res.status(400).json({ msg: "Invalid answers format" });
//         }

        
//         const score = calculateScore(exam.questions, answers);

        
//         console.log(score);

//         const percentage = (score / exam.questions.length) * 100;

//         const result = new Result({
//             userId: req.user.userId,
//             examId: exam._id,
//             score,
//             totalQuestions: exam.questions.length,
//             percentage,
//         });


//         console.log(result);

//         await result.save();

//         examSession.submitted = true;
//         examSession.submissionTime = currentTime;
//         await examSession.save();

//         res.status(200).json({ msg: "Exam submitted successfully", result });
//     } catch (error) {
//         console.error(error); // Log the error
//         res.status(500).json({ msg: "Server error" });
//     }
// });


// router.post("/submit/:examSessionId", auth, async (req, res) => {
//     if (req.user.role !== "student") {
//       return res.status(403).json({ msg: "Access denied" });
//     }
  
//     try {
//       const examSession = await ExamSession.findById(req.params.examSessionId);
//       if (!examSession) return res.status(404).json({ msg: "Exam session not found" });
  
//       const exam = await Exam.findById(examSession.examId);
//       if (!exam) return res.status(404).json({ msg: "Exam not found" });
  
//       const currentTime = new Date();
//       if (currentTime > examSession.endTime) {
//         return res.status(400).json({ msg: "Time expired. Auto-submitting exam." });
//       }
  
//       const { answers } = req.body;
//       if (!answers) return res.status(400).json({ msg: "Invalid answers format" });
  
//       const calculateScore = (questions, studentAnswers) => {
//         let score = 0;
//         questions.forEach(question => {
//           const questionId = question._id.toString();
//           if (studentAnswers[questionId] && studentAnswers[questionId] === question.correctAnswer) {
//             score++;
//           }
//         });
//         return score;
//       };
  
//       const score = calculateScore(exam.questions, answers);
//       const percentage = (score / exam.questions.length) * 100;
  
//       const result = new Result({
//         userId: req.user.userId,
//         examId: exam._id,
//         score,
//         totalQuestions: exam.questions.length,
//         percentage,
//       });
  
//       await result.save();
  
//       examSession.submitted = true;
//       examSession.submissionTime = currentTime;
//       await examSession.save();
  
//       let certificateUrl = null;
  
//       // 🎓 Only generate certificate if above 50%
//       if (percentage > 50) {
//         const userId = new mongoose.Types.ObjectId(req.user.userId);
//         const user = await User.findById(userId);
//         const studentName = user.name || "Student"; 
//         const examName = exam.title || "Your Exam";
//         const fileName = `${studentName}-${examName}-certificate.pdf`.replace(/\s+/g, '-');
//         const filePath = `./certificates/${fileName}`;
  
//         if (!fs.existsSync('./certificates')) fs.mkdirSync('./certificates');
  
//         // Generate PDF
//         const doc = new PDFDocument();
//         const writeStream = fs.createWriteStream(filePath);
//         doc.pipe(writeStream);
  
//         doc.fontSize(26).text('Certificate of Achievement', { align: 'center' });
//         doc.moveDown();
//         doc.fontSize(18).text(`This is to certify that ${studentName}`, { align: 'center' });
//         doc.text(`has successfully completed the exam: ${examName}`, { align: 'center' });
//         doc.text(`with a score of ${percentage.toFixed(2)}%`, { align: 'center' });
  
//         doc.end();
  
//         // Wait for PDF generation to complete
//         await new Promise(resolve => writeStream.on('finish', resolve));
  
//         // Upload to S3
//         certificateUrl = await uploadToS3(filePath, fileName);
  
//         // Clean up local file
//         fs.unlinkSync(filePath);
//       }
  
//       res.status(200).json({
//         msg: "Exam submitted successfully",
//         result,
//         certificateUrl, // <- return to frontend
//       });
  
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ msg: "Server error" });
//     }
//   });
  

router.post("/submit/:examSessionId", auth, async (req, res) => {
    if (req.user.role !== "student") {
      return res.status(403).json({ msg: "Access denied" });
    }
  
    try {
      const examSession = await ExamSession.findById(req.params.examSessionId);
      if (!examSession) return res.status(404).json({ msg: "Exam session not found" });
  
      const exam = await Exam.findById(examSession.examId);
      if (!exam) return res.status(404).json({ msg: "Exam not found" });
  
      const currentTime = new Date();
      if (currentTime > examSession.endTime) {
        return res.status(400).json({ msg: "Time expired. Auto-submitting exam." });
      }
  
      const { answers } = req.body;
      if (!answers) return res.status(400).json({ msg: "Invalid answers format" });
  
      const calculateScore = (questions, studentAnswers) => {
        let score = 0;
        questions.forEach(question => {
          const questionId = question._id.toString();
          if (studentAnswers[questionId] && studentAnswers[questionId] === question.correctAnswer) {
            score++;
          }
        });
        return score;
      };
  
      const score = calculateScore(exam.questions, answers);
      const percentage = (score / exam.questions.length) * 100;
  
      const result = new Result({
        userId: req.user.userId,
        examId: exam._id,
        score,
        totalQuestions: exam.questions.length,
        percentage,
      });
  
      await result.save();
  
      examSession.submitted = true;
      examSession.submissionTime = currentTime;
      await examSession.save();
  
      let certificateUrl = null;
  
      // 🎓 Only generate certificate if above 50%
      if (percentage > 50) {
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        const user = await User.findById(userId);
        const studentName = user.name || "Student";
        const examName = exam.title || "Your Exam";
  
        // Sanitize and build file name and path
        const safeStudentName = studentName.replace(/[\/\\?%*:|"<>]/g, '').replace(/\s+/g, '-');
        const safeExamName = examName.replace(/[\/\\?%*:|"<>]/g, '').replace(/\s+/g, '-');
        const fileName = `${safeStudentName}-${safeExamName}-certificate.pdf`;
        const certDir = path.join(__dirname, '../certificates');
        const filePath = path.join(certDir, fileName);
  
        // Ensure folder exists
        if (!fs.existsSync(certDir)) fs.mkdirSync(certDir, { recursive: true });
  
        // Generate PDF
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);
  
        doc.fontSize(26).text('Certificate of Achievement', { align: 'center' });
        doc.moveDown();
        doc.fontSize(18).text(`This is to certify that ${studentName}`, { align: 'center' });
        doc.text(`has successfully completed the exam: ${examName}`, { align: 'center' });
        doc.text(`with a score of ${percentage.toFixed(2)}%`, { align: 'center' });
  
        doc.end();
  
        // Wait for PDF generation
        await new Promise(resolve => writeStream.on('finish', resolve));
  
        // Upload to S3 and remove local file
        certificateUrl = await uploadToS3(filePath, fileName);
        fs.unlinkSync(filePath);
      }
  
      res.status(200).json({
        msg: "Exam submitted successfully",
        result,
        certificateUrl,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  });

module.exports = router;
