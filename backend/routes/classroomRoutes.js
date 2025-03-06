const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();
const {
  addBench,
  removeBench,
  editBench,
  changeBenchPosition,
  getBenchesByClassroom
} = require("../controllers/classroomAll");

// ✅ Create a Classroom
router.post("/", async (req, res) => {
  try {
    const { name, floor, capacity } = req.body;
    const newClassroom = await prisma.classroom.create({
      data: { name, floor, capacity },
    });
    res.json(newClassroom);
  } catch (error) {
    res.status(500).json({ error: "Error creating classroom" });
  }
});

// ✅ Get All Classrooms
router.get("/", async (req, res) => {
  try {
    const classrooms = await prisma.classroom.findMany({
      include: { benches: true, examSessions: true },
    });
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ error: "Error fetching classrooms" });
  }
});

// ✅ Get a Single Classroom by ID
router.get("/:id", async (req, res) => {
  try {
    const classroom = await prisma.classroom.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { benches: true, examSessions: true },
    });
    if (!classroom) return res.status(404).json({ error: "Classroom not found" });
    res.json(classroom);
  } catch (error) {
    res.status(500).json({ error: "Error fetching classroom" });
  }
});

// ✅ Update a Classroom
router.put("/:id", async (req, res) => {
  try {
    const { name, floor, capacity } = req.body;
    const updatedClassroom = await prisma.classroom.update({
      where: { id: parseInt(req.params.id) },
      data: { name, floor, capacity },
    });
    res.json(updatedClassroom);
  } catch (error) {
    res.status(500).json({ error: "Error updating classroom" });
  }
});

// ✅ Delete a Classroom
router.delete("/:id", async (req, res) => {
  try {
    await prisma.classroom.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Classroom deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting classroom" });
  }
});

//benches and clasrooms 
router.get("/bench/:classroomId", getBenchesByClassroom);
router.post("/addbench", addBench);
router.delete("/removebench/:benchId", removeBench);
router.put("/editbench/:benchId", editBench);
router.put("/change-position-bench/:benchId", changeBenchPosition);

module.exports = router;
