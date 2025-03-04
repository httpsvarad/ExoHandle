const express = require("express");
const router = express.Router();
const examSessionTeacherController = require("../controllers/examSessionTeacherController");

// Routes
router.post("/", examSessionTeacherController.createExamSessionTeacher); // Create
router.get("/", examSessionTeacherController.getAllExamSessionTeachers); // Get All
router.get("/:id", examSessionTeacherController.getExamSessionTeacherById); // Get By ID
router.put("/:id", examSessionTeacherController.updateExamSessionTeacher); // Update
router.delete("/:id", examSessionTeacherController.deleteExamSessionTeacher); // Delete

module.exports = router;
