const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// // ✅ Create Exam Teacher Arrangement
// exports.createExamTeacherArrangement = async (req, res) => {
//   try {
//     const { examSessionId, teacherId, posX, posY, status } = req.body;
//     const newExamTeacherArrangement = await prisma.examTeacherArrangement.create({
//       data: {
//         examSessionId,
//         teacherId,
//         posX,
//         posY,
//         status,
//       },
//     });
//     res.status(201).json(newExamTeacherArrangement);
//   } catch (error) {
//     console.error("Error creating exam teacher arrangement:", error);
//     res.status(500).json({ error: "Failed to create exam teacher arrangement" });
//   }
// };

// // ✅ Get All Exam Teacher Arrangements
// exports.getAllExamTeacherArrangements = async (req, res) => {
//   try {
//     const examTeacherArrangements = await prisma.examTeacherArrangement.findMany({
//       include: { examSession: true, teacher: true },
//     });
//     res.status(200).json(examTeacherArrangements);
//   } catch (error) {
//     console.error("Error fetching exam teacher arrangements:", error);
//     res.status(500).json({ error: "Failed to fetch exam teacher arrangements" });
//   }
// };

// // ✅ Get Exam Teacher Arrangement by ID
// exports.getExamTeacherArrangementById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const examTeacherArrangement = await prisma.examTeacherArrangement.findUnique({
//       where: { id: parseInt(id) },
//       include: { examSession: true, teacher: true },
//     });
//     if (!examTeacherArrangement) return res.status(404).json({ error: "Exam teacher arrangement not found" });
//     res.status(200).json(examTeacherArrangement);
//   } catch (error) {
//     console.error("Error fetching exam teacher arrangement:", error);
//     res.status(500).json({ error: "Failed to fetch exam teacher arrangement" });
//   }
// };

// // ✅ Update Exam Teacher Arrangement
// exports.updateExamTeacherArrangement = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { examSessionId, teacherId, posX, posY, status } = req.body;
//     const updatedExamTeacherArrangement = await prisma.examTeacherArrangement.update({
//       where: { id: parseInt(id) },
//       data: {
//         examSessionId,
//         teacherId,
//         posX,
//         posY,
//         status,
//       },
//     });
//     res.status(200).json(updatedExamTeacherArrangement);
//   } catch (error) {
//     console.error("Error updating exam teacher arrangement:", error);
//     res.status(500).json({ error: "Failed to update exam teacher arrangement" });
//   }
// };

// // ✅ Delete Exam Teacher Arrangement
// exports.deleteExamTeacherArrangement = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await prisma.examTeacherArrangement.delete({ where: { id: parseInt(id) } });
//     res.status(200).json({ message: "Exam teacher arrangement deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting exam teacher arrangement:", error);
//     res.status(500).json({ error: "Failed to delete exam teacher arrangement" });
//   }
// };




// import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * ✅ Generate Exam Teacher Arrangements
 * Assigns teachers to classrooms for invigilation based on exam sessions.
 */
exports.generateExamTeacherAssignments = async (req, res) => {
  try {
    const { examDate } = req.body;

    // 1️⃣ Fetch all exam sessions on the given date
    const examSessions = await prisma.examSession.findMany({
      where: {
        exam: { examDate: new Date(examDate) },
      },
      include: { classroom: true },
    });

    // 2️⃣ Fetch available teachers
    const availableTeachers = await prisma.user.findMany({
      where: { role: "TEACHER", availabilityStatus: "AVAILABLE" },
    });

    if (!examSessions.length || !availableTeachers.length) {
      return res.status(400).json({ success: false, message: "No exams or available teachers found." });
    }

    let assignments = [];
    let teacherIndex = 0;

    // 3️⃣ Assign teachers to classrooms for invigilation
    for (const session of examSessions) {
      const { id: examSessionId, classroomId } = session;

      if (teacherIndex >= availableTeachers.length) break; // Stop if no more teachers are available

      // Assign teacher to the exam session
      const assignedTeacher = availableTeachers[teacherIndex];
      teacherIndex++;

      const assignment = await prisma.examTeacherArrangement.create({
        data: {
          examSessionId,
          teacherId: assignedTeacher.id,
          // classroomId,
          posX: Math.floor(Math.random() * 5), // Assigning random position for seating
          posY: Math.floor(Math.random() * 5),
          // status: "ASSIGNED",
          assignedAt: new Date(),
        },
      });

      assignments.push(assignment);
    }

    return res.status(201).json({
      success: true,
      message: "Exam teacher arrangements generated successfully",
      assignments,
    });
  } catch (error) {
    console.error("Error generating exam teacher assignments:", error);
    return res.status(500).json({ success: false, message: "Error generating assignments" });
  }
};

/**
 * ✅ Get All Exam Teacher Arrangements
 */
exports.getAllExamTeacherArrangements = async (req, res) => {
  try {
    const arrangements = await prisma.examTeacherArrangement.findMany({
      include: { examSession: true, teacher: true },
    });

    res.status(200).json(arrangements);
  } catch (error) {
    console.error("Error fetching exam teacher arrangements:", error);
    res.status(500).json({ error: "Failed to fetch exam teacher arrangements" });
  }
};

/**
 * ✅ Get a Single Exam Teacher Arrangement by ID
 */
exports.getExamTeacherArrangementById = async (req, res) => {
  try {
    const { id } = req.params;
    const arrangement = await prisma.examTeacherArrangement.findUnique({
      where: { id: parseInt(id) },
      include: { examSession: true, teacher: true },
    });

    if (!arrangement) {
      return res.status(404).json({ error: "Exam teacher arrangement not found" });
    }

    res.status(200).json(arrangement);
  } catch (error) {
    console.error("Error fetching exam teacher arrangement:", error);
    res.status(500).json({ error: "Failed to fetch exam teacher arrangement" });
  }
};

/**
 * ✅ Update an Exam Teacher Arrangement
 */
exports.updateExamTeacherArrangement = async (req, res) => {
  try {
    const { id } = req.params;
    const { examSessionId, teacherId, posX, posY, status } = req.body;

    const updatedArrangement = await prisma.examTeacherArrangement.update({
      where: { id: parseInt(id) },
      data: { examSessionId, teacherId, posX, posY, status },
    });

    res.status(200).json(updatedArrangement);
  } catch (error) {
    console.error("Error updating exam teacher arrangement:", error);
    res.status(500).json({ error: "Failed to update exam teacher arrangement" });
  }
};

/**
 * ✅ Delete an Exam Teacher Arrangement
 */
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
