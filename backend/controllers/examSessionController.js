const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ✅ Create Exam Session
exports.createExamSession = async (req, res) => {
  try {
    const { examId, classroomId, sessionStart, sessionEnd, description } = req.body;
    const newExamSession = await prisma.examSession.create({
      data: {
        examId,
        classroomId,
        sessionStart: new Date(sessionStart),
        sessionEnd: new Date(sessionEnd),
        description,
      },
    });
    res.status(201).json(newExamSession);
  } catch (error) {
    console.error("Error creating exam session:", error);
    res.status(500).json({ error: "Failed to create exam session" });
  }
};

// ✅ Get All Exam Sessions
exports.getAllExamSessions = async (req, res) => {
  try {
    const examSessions = await prisma.examSession.findMany({
      include: { exam: true, classroom: true, examSeatingArrangements: true },
    });
    res.status(200).json(examSessions);
  } catch (error) {
    console.error("Error fetching exam sessions:", error);
    res.status(500).json({ error: "Failed to fetch exam sessions" });
  }
};

// ✅ Get Exam Session by ID
exports.getExamSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const examSession = await prisma.examSession.findUnique({
      where: { id: parseInt(id) },
      include: { exam: true, classroom: true, examSeatingArrangements: true },
    });
    if (!examSession) return res.status(404).json({ error: "Exam session not found" });
    res.status(200).json(examSession);
  } catch (error) {
    console.error("Error fetching exam session:", error);
    res.status(500).json({ error: "Failed to fetch exam session" });
  }
};

// ✅ Update Exam Session
exports.updateExamSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { examId, classroomId, sessionStart, sessionEnd, description } = req.body;
    const updatedExamSession = await prisma.examSession.update({
      where: { id: parseInt(id) },
      data: {
        examId,
        classroomId,
        sessionStart: new Date(sessionStart),
        sessionEnd: new Date(sessionEnd),
        description,
      },
    });
    res.status(200).json(updatedExamSession);
  } catch (error) {
    console.error("Error updating exam session:", error);
    res.status(500).json({ error: "Failed to update exam session" });
  }
};

// ✅ Delete Exam Session
exports.deleteExamSession = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.examSession.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Exam session deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam session:", error);
    res.status(500).json({ error: "Failed to delete exam session" });
  }
};
