const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ✅ Create Exam Teacher Arrangement
exports.createExamTeacherArrangement = async (req, res) => {
  try {
    const { examSessionId, teacherId, posX, posY, status } = req.body;
    const newExamTeacherArrangement = await prisma.examTeacherArrangement.create({
      data: {
        examSessionId,
        teacherId,
        posX,
        posY,
        status,
      },
    });
    res.status(201).json(newExamTeacherArrangement);
  } catch (error) {
    console.error("Error creating exam teacher arrangement:", error);
    res.status(500).json({ error: "Failed to create exam teacher arrangement" });
  }
};

// ✅ Get All Exam Teacher Arrangements
exports.getAllExamTeacherArrangements = async (req, res) => {
  try {
    const examTeacherArrangements = await prisma.examTeacherArrangement.findMany({
      include: { examSession: true, teacher: true },
    });
    res.status(200).json(examTeacherArrangements);
  } catch (error) {
    console.error("Error fetching exam teacher arrangements:", error);
    res.status(500).json({ error: "Failed to fetch exam teacher arrangements" });
  }
};

// ✅ Get Exam Teacher Arrangement by ID
exports.getExamTeacherArrangementById = async (req, res) => {
  try {
    const { id } = req.params;
    const examTeacherArrangement = await prisma.examTeacherArrangement.findUnique({
      where: { id: parseInt(id) },
      include: { examSession: true, teacher: true },
    });
    if (!examTeacherArrangement) return res.status(404).json({ error: "Exam teacher arrangement not found" });
    res.status(200).json(examTeacherArrangement);
  } catch (error) {
    console.error("Error fetching exam teacher arrangement:", error);
    res.status(500).json({ error: "Failed to fetch exam teacher arrangement" });
  }
};

// ✅ Update Exam Teacher Arrangement
exports.updateExamTeacherArrangement = async (req, res) => {
  try {
    const { id } = req.params;
    const { examSessionId, teacherId, posX, posY, status } = req.body;
    const updatedExamTeacherArrangement = await prisma.examTeacherArrangement.update({
      where: { id: parseInt(id) },
      data: {
        examSessionId,
        teacherId,
        posX,
        posY,
        status,
      },
    });
    res.status(200).json(updatedExamTeacherArrangement);
  } catch (error) {
    console.error("Error updating exam teacher arrangement:", error);
    res.status(500).json({ error: "Failed to update exam teacher arrangement" });
  }
};

// ✅ Delete Exam Teacher Arrangement
exports.deleteExamTeacherArrangement = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.examTeacherArrangement.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Exam teacher arrangement deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam teacher arrangement:", error);
    res.status(500).json({ error: "Failed to delete exam teacher arrangement" });
  }
};
