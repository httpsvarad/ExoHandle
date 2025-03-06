const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Add a Bench to a Classroom
 */
exports.getBenchesByClassroom = async (req, res) => {
    try {
      const { classroomId } = req.params;
  
      if (!classroomId) {
        return res.status(400).json({ error: "Classroom ID is required." });
      }
  
      const benches = await prisma.bench.findMany({
        where: { classroomId: parseInt(classroomId) },
      });
  
      res.status(200).json(benches);
    } catch (error) {
      console.error("Error fetching benches:", error);
      res.status(500).json({ error: "Failed to fetch benches" });
    }
  };

exports.addBench = async (req, res) => {
  try {
    const { classroomId, label, maxSeats, posX, posY } = req.body;

    if (!classroomId || !label || !maxSeats || posX === undefined || posY === undefined) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newBench = await prisma.bench.create({
      data: {
        classroomId,
        label,
        maxSeats,
        posX,
        posY,
      },
    });

    res.status(201).json(newBench);
  } catch (error) {
    console.error("Error adding bench:", error);
    res.status(500).json({ error: "Failed to add bench" });
  }
};

/**
 * Remove a Bench by ID
 */
exports.removeBench = async (req, res) => {
  try {
    const { benchId } = req.params;

    if (!benchId) {
      return res.status(400).json({ error: "Bench ID is required." });
    }

    await prisma.bench.delete({
      where: { id: parseInt(benchId) },
    });

    res.status(200).json({ message: "Bench removed successfully." });
  } catch (error) {
    console.error("Error removing bench:", error);
    res.status(500).json({ error: "Failed to remove bench" });
  }
};

/**
 * Edit a Bench (Update Label, MaxSeats, etc.)
 */
exports.editBench = async (req, res) => {
  try {
    const { benchId } = req.params;
    const { label, maxSeats, occupiedSeats } = req.body;

    if (!benchId) {
      return res.status(400).json({ error: "Bench ID is required." });
    }

    const updatedBench = await prisma.bench.update({
      where: { id: parseInt(benchId) },
      data: { label, maxSeats, occupiedSeats },
    });

    res.status(200).json(updatedBench);
  } catch (error) {
    console.error("Error updating bench:", error);
    res.status(500).json({ error: "Failed to update bench" });
  }
};

/**
 * Change Bench Position
 */
exports.changeBenchPosition = async (req, res) => {
  try {
    const { benchId } = req.params;
    const { posX, posY } = req.body;

    if (!benchId || posX === undefined || posY === undefined) {
      return res.status(400).json({ error: "Bench ID and new position are required." });
    }

    const updatedBench = await prisma.bench.update({
      where: { id: parseInt(benchId) },
      data: { posX, posY },
    });

    res.status(200).json(updatedBench);
  } catch (error) {
    console.error("Error changing bench position:", error);
    res.status(500).json({ error: "Failed to change bench position" });
  }
};
