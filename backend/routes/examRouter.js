const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// ✅ Create an Exam
router.post("/exam", async (req, res) => {
  try {
    const { name, examDate, description } = req.body;
    const exam = await prisma.exam.create({
      data: { name, examDate: new Date(examDate), description },
    });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ error: "Error creating exam" });
  }
});

// ✅ Get All Exams
router.get("/exam", async (req, res) => {
  try {
    const exams = await prisma.exam.findMany({ include: { examSessions: true } });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: "Error fetching exams" });
  }
});

// ✅ Get Exam by ID
router.get("/exam/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await prisma.exam.findUnique({
      where: { id: Number(id) },
      include: { examSessions: true },
    });
    exam ? res.json(exam) : res.status(404).json({ error: "Exam not found" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching exam" });
  }
});

// ✅ Create an Exam Session
router.post("/exam-session", async (req, res) => {
  try {
    const { examId, classroomId, sessionStart, sessionEnd, description } = req.body;
    const session = await prisma.examSession.create({
      data: {
        examId,
        classroomId,
        sessionStart: new Date(sessionStart),
        sessionEnd: new Date(sessionEnd),
        description,
      },
    });
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: "Error creating exam session" });
  }
});

// ✅ Get All Exam Sessions
router.get("/exam-session", async (req, res) => {
  try {
    const sessions = await prisma.examSession.findMany({
      include: { exam: true, classroom: true },
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching exam sessions" });
  }
});

// ✅ Get Exam Session by ID
router.get("/exam-session/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const session = await prisma.examSession.findUnique({
      where: { id: Number(id) },
      include: { exam: true, classroom: true },
    });
    session ? res.json(session) : res.status(404).json({ error: "Session not found" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching exam session" });
  }
});

module.exports = router;
