const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Seating Assignment Function
const assignExamSeating = (students, benches) => {
    students.sort(() => Math.random() - 0.5); // Shuffle students for randomness
    const seatAssignments = [];

    students.forEach((student) => {
        const { studentId, semesterId } = student;

        for (const bench of benches) {
            const { id: benchId, maxSeats } = bench;
            const assignedStudents = seatAssignments.filter((s) => s.bench_id === benchId);
            const assignedSemesters = new Set(assignedStudents.map((s) => s.semesterId));

            if (!assignedSemesters.has(semesterId) && assignedStudents.length < maxSeats) {
                seatAssignments.push({
                    bench_id: benchId,
                    seat_number: assignedStudents.length + 1,
                    student_id: studentId,
                    semesterId: semesterId,
                    assigned_at: new Date().toISOString()
                });
                break;
            }
        }
    });

    return seatAssignments;
};

// API to Generate Seating Arrangement
router.post("/generate-seating", async (req, res) => {
    try {
        const { semesterIds, classroomId } = req.body;

        if (!semesterIds || semesterIds.length === 0 || !classroomId) {
            return res.status(400).json({ error: "semesterIds and classroomId are required" });
        }

        // Fetch students for the given semesters
        const students = await prisma.studentSemester.findMany({
            where: { semesterId: { in: semesterIds } },
            select: { studentId: true, semesterId: true }
        });

        // Fetch available benches for the given classroom
        const benches = await prisma.bench.findMany({
            where: { classroomId },
            select: { id: true, maxSeats: true }
        });

        if (students.length === 0 || benches.length === 0) {
            return res.status(404).json({ error: "No students or benches found" });
        }

        // Generate seating assignments
        const assignments = assignExamSeating(students, benches);

        // Insert into ExamSeatingArrangement table with status DRAFT
        await prisma.examSeatingArrangement.createMany({
            data: assignments.map((a) => ({
                examSessionId: 1, // Replace with actual examSessionId
                benchId: a.bench_id,
                seatNumber: a.seat_number,
                studentId: a.student_id,
                status: "DRAFT",
                assignedAt: new Date(a.assigned_at)
            }))
        });

        res.json({ message: "Seating arrangement saved in DRAFT mode", assignments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// // {
//   "semesterIds": [1, 2, 3], 
//   "classroomId": 5
// }
module.exports = router;
