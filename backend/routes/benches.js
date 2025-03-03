const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// ✅ Create a Bench
router.post("/", async (req, res) => {
  try {
    const { classroomId, label, maxSeats, posX, posY } = req.body;
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
    res.status(500).json({ error: "Error creating bench", details: error.message });
  }
});

// ✅ Get All Benches
router.get("/", async (req, res) => {
  try {
    const benches = await prisma.bench.findMany({
      include: { classroom: true }, // Include related classroom details
    });
    res.json(benches);
  } catch (error) {
    res.status(500).json({ error: "Error fetching benches", details: error.message });
  }
});

// ✅ Get a Single Bench by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bench = await prisma.bench.findUnique({
      where: { id: Number(id) },
      include: { classroom: true },
    });
    if (!bench) return res.status(404).json({ error: "Bench not found" });
    res.json(bench);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bench", details: error.message });
  }
});

// ✅ Update a Bench by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { label, maxSeats, occupiedSeats, posX, posY } = req.body;

    const updatedBench = await prisma.bench.update({
      where: { id: Number(id) },
      data: { label, maxSeats, occupiedSeats, posX, posY },
    });

    res.json(updatedBench);
  } catch (error) {
    res.status(500).json({ error: "Error updating bench", details: error.message });
  }
});

// ✅ Delete a Bench by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.bench.delete({ where: { id: Number(id) } });
    res.json({ message: "Bench deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting bench", details: error.message });
  }
});

module.exports = router;
