const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ✅ Create Exam Session Teacher
exports.createExamSessionTeacher = async (req, res) => {
  try {
    const { examSessionId, teacherId, role } = req.body;
    const newExamSessionTeacher = await prisma.examSessionTeacher.create({
      data: {
        examSessionId,
        teacherId,
        role,
      },
    });
    res.status(201).json(newExamSessionTeacher);
  } catch (error) {
    console.error("Error creating exam session teacher:", error);
    res.status(500).json({ error: "Failed to create exam session teacher" });
  }
};

// ✅ Get All Exam Session Teachers
exports.getAllExamSessionTeachers = async (req, res) => {
  try {
    const examSessionTeachers = await prisma.examSessionTeacher.findMany({
      include: { examSession: true, teacher: true },
    });
    res.status(200).json(examSessionTeachers);
  } catch (error) {
    console.error("Error fetching exam session teachers:", error);
    res.status(500).json({ error: "Failed to fetch exam session teachers" });
  }
};

// ✅ Get Exam Session Teacher by ID
exports.getExamSessionTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const examSessionTeacher = await prisma.examSessionTeacher.findUnique({
      where: { id: parseInt(id) },
      include: { examSession: true, teacher: true },
    });
    if (!examSessionTeacher) return res.status(404).json({ error: "Exam session teacher not found" });
    res.status(200).json(examSessionTeacher);
  } catch (error) {
    console.error("Error fetching exam session teacher:", error);
    res.status(500).json({ error: "Failed to fetch exam session teacher" });
  }
};

// ✅ Update Exam Session Teacher
exports.updateExamSessionTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { examSessionId, teacherId, role } = req.body;
    const updatedExamSessionTeacher = await prisma.examSessionTeacher.update({
      where: { id: parseInt(id) },
      data: {
        examSessionId,
        teacherId,
        role,
      },
    });
    res.status(200).json(updatedExamSessionTeacher);
  } catch (error) {
    console.error("Error updating exam session teacher:", error);
    res.status(500).json({ error: "Failed to update exam session teacher" });
  }
};

// ✅ Delete Exam Session Teacher
exports.deleteExamSessionTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.examSessionTeacher.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Exam session teacher deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam session teacher:", error);
    res.status(500).json({ error: "Failed to delete exam session teacher" });
  }
};
