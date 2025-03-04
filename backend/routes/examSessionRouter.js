const express = require("express");
const router = express.Router();
const examSessionController = require("../controllers/examSessionController");

// Routes
router.post("/", examSessionController.createExamSession); // Create
router.get("/", examSessionController.getAllExamSessions); // Get All
router.get("/:id", examSessionController.getExamSessionById); // Get By ID
router.put("/:id", examSessionController.updateExamSession); // Update
router.delete("/:id", examSessionController.deleteExamSession); // Delete

module.exports = router;
