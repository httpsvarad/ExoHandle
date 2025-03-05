const express = require("express");
const router = express.Router();
const examTeacherArrangementController = require("../controllers/examTeacherArrangementController");

// Routes
router.post("/", examTeacherArrangementController.generateExamTeacherAssignments); // Create
router.get("/", examTeacherArrangementController.getAllExamTeacherArrangements); // Get All
router.get("/:id", examTeacherArrangementController.getExamTeacherArrangementById); // Get By ID
router.put("/:id", examTeacherArrangementController.updateExamTeacherArrangement); // Update
router.delete("/:id", examTeacherArrangementController.deleteExamTeacherArrangement); // Delete

module.exports = router;
