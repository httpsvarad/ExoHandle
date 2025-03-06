const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Assign students to a division
 */
exports.assignStudentsToDivision = async (req, res) => {
  try {
    const { divisionId, students } = req.body;

    if (!divisionId || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ error: "divisionId and students array are required." });
    }

    const studentData = students.map(({ studentId, batchId }) => ({
      studentId,
      divisionId,
      batchId: batchId || null, // batchId is optional
    }));

    await prisma.studentDivision.createMany({
      data: studentData,
      skipDuplicates: true, // Prevent duplicate entries
    });

    res.status(201).json({ message: "Students assigned to division successfully." });
  } catch (error) {
    console.error("Error assigning students to division:", error);
    res.status(500).json({ error: "Failed to assign students to division" });
  }
};

/**
 * Assign students to a semester
 */
exports.assignStudentsToSemester = async (req, res) => {
  try {
    const { semesterId, students } = req.body;

    if (!semesterId || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ error: "semesterId and students array are required." });
    }

    const studentData = students.map(({ studentId, status }) => ({
      studentId,
      semesterId,
      status: status || "PENDING", // Default status
    }));

    await prisma.studentSemester.createMany({
      data: studentData,
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Students assigned to semester successfully." });
  } catch (error) {
    console.error("Error assigning students to semester:", error);
    res.status(500).json({ error: "Failed to assign students to semester" });
  }
};
