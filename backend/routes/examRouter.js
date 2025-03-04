const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");

// Routes
router.post("/", examController.createExam); // Create Exam
router.get("/", examController.getAllExams); // Get All Exams
router.get("/:id", examController.getExamById); // Get Exam by ID
router.put("/:id", examController.updateExam); // Update Exam
router.delete("/:id", examController.deleteExam); // Delete Exam

module.exports = router;
