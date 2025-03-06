const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Add multiple subjects to a division
 */
exports.addSubjectsToDivision = async (req, res) => {
  try {
    const { divisionId, subjectIds } = req.body;

    if (!divisionId || !Array.isArray(subjectIds) || subjectIds.length === 0) {
      return res.status(400).json({ error: "divisionId and subjectIds array are required." });
    }

    const subjectData = subjectIds.map(subjectId => ({
      divisionId,
      subjectId
    }));

    await prisma.divisionSubject.createMany({
      data: subjectData,
      skipDuplicates: true, // Prevent duplicate entries
    });

    res.status(201).json({ message: "Subjects added to division successfully." });
  } catch (error) {
    console.error("Error adding subjects to division:", error);
    res.status(500).json({ error: "Failed to add subjects to division" });
  }
};

/**
 * Assign multiple teachers to a division for specific subjects
 */
exports.assignTeachersToDivision = async (req, res) => {
  try {
    const { divisionId, teacherAssignments } = req.body;

    if (!divisionId || !Array.isArray(teacherAssignments) || teacherAssignments.length === 0) {
      return res.status(400).json({ error: "divisionId and teacherAssignments array are required." });
    }

    const teacherData = teacherAssignments.map(({ subjectId, teacherId, assignmentType }) => ({
      divisionId,
      subjectId,
      teacherId,
      assignmentType: assignmentType || "THEORY", // Default assignment type
    }));

    await prisma.divisionTeacher.createMany({
      data: teacherData,
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Teachers assigned to division successfully." });
  } catch (error) {
    console.error("Error assigning teachers to division:", error);
    res.status(500).json({ error: "Failed to assign teachers to division" });
  }
};
