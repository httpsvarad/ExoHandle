const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ✅ Create Subject
exports.createSubject = async (req, res) => {
  try {
    const { name, type } = req.body;
    if (!name || !type) {
        return res.status(400).json({ error: "Name and type are required fields." });
      }
    
    const subject = await prisma.subject.create({
      data: { name, type },
    });
    res.status(201).json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating subject" });
  }
};

// ✅ Get All Subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Error fetching subjects" });
  }
};

// ✅ Get Single Subject
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await prisma.subject.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!subject) return res.status(404).json({ error: "Subject not found" });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: "Error fetching subject" });
  }
};

// ✅ Update Subject
exports.updateSubject = async (req, res) => {
  try {
    const { name, type } = req.body;
    const updatedSubject = await prisma.subject.update({
      where: { id: parseInt(req.params.id) },
      data: { name, type },
    });
    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: "Error updating subject" });
  }
};

// ✅ Delete Subject
exports.deleteSubject = async (req, res) => {
  try {
    await prisma.subject.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting subject" });
  }
};
