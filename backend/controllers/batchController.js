const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 🚀 Create a new batch
exports.createBatch = async (req, res) => {
  try {
    const { divisionId, name } = req.body;

    // Validation
    if (!divisionId || !name) {
      return res.status(400).json({ error: "divisionId and name are required." });
    }

    const batch = await prisma.batch.create({
      data: { divisionId, name },
    });

    res.status(201).json(batch);
  } catch (error) {
    console.error("Error creating batch:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📌 Get all batches
exports.getAllBatches = async (req, res) => {
  try {
    const batches = await prisma.batch.findMany({
      include: { division: true }, // Optional: Include division details
    });
    res.json(batches);
  } catch (error) {
    console.error("Error fetching batches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📌 Get a single batch by ID
exports.getBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await prisma.batch.findUnique({
      where: { id: parseInt(id) },
      include: { division: true },
    });

    if (!batch) return res.status(404).json({ error: "Batch not found." });

    res.json(batch);
  } catch (error) {
    console.error("Error fetching batch:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📌 Update a batch
exports.updateBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, divisionId } = req.body;

    const batch = await prisma.batch.update({
      where: { id: parseInt(id) },
      data: { name, divisionId },
    });

    res.json(batch);
  } catch (error) {
    console.error("Error updating batch:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ❌ Delete a batch
exports.deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.batch.delete({ where: { id: parseInt(id) } });

    res.json({ message: "Batch deleted successfully!" });
  } catch (error) {
    console.error("Error deleting batch:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
