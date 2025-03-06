const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ✅ Create Exam
exports.createExam = async (req, res) => {
  try {
    const { name, examDate, description ,instituteId } = req.body;
    const newExam = await prisma.exam.create({
      data: { name, examDate: new Date(examDate), description,instituteId },
    });
    res.status(201).json(newExam);
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({ error: "Failed to create exam" });
  }
};

// ✅ Get All Exams
exports.getAllExams = async (req, res) => {
  try {
    const exams = await prisma.exam.findMany({ include: { examSessions: true } });
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ error: "Failed to fetch exams" });
  }
};

exports.getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await prisma.exam.findMany({
      where: { id: parseInt(id) },
      include: { examSessions: true },
    });
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.status(200).json(exam);
  } catch (error) {
    console.error("Error fetching exam:", error);
    res.status(500).json({ error: "Failed to fetch exam" });
  }
};
// ✅ Get Exam by ID
exports.getExamByInstituteId = async (req, res) => {
  try {
    const { instituteId } = req.params;
    const exam = await prisma.exam.findMany({
      where: { instituteId: parseInt(instituteId) },
      include: { examSessions: true },
    });
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.status(200).json(exam);
  } catch (error) {
    console.error("Error fetching exam:", error);
    res.status(500).json({ error: "Failed to fetch exam" });
  }
};

// ✅ Update Exam
exports.updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, examDate, description } = req.body;
    const updatedExam = await prisma.exam.update({
      where: { id: parseInt(id) },
      data: { name, examDate: new Date(examDate), description },
    });
    res.status(200).json(updatedExam);
  } catch (error) {
    console.error("Error updating exam:", error);
    res.status(500).json({ error: "Failed to update exam" });
  }
};

// ✅ Delete Exam
exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.exam.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ error: "Failed to delete exam" });
  }
};
