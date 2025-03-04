const assignExamSeating = (students, benches) => {
    // Shuffle students for randomness
    students.sort(() => Math.random() - 0.5);

    const seatAssignments = [];

    students.forEach(student => {
        const { id: studentId, semester } = student;

        for (const bench of benches) {
            const { id: benchId, max_seats } = bench;
            const assignedStudents = seatAssignments.filter(s => s.bench_id === benchId);
            const assignedSemesters = new Set(assignedStudents.map(s => s.semester));

            if (!assignedSemesters.has(semester) && assignedStudents.length < max_seats) {
                seatAssignments.push({
                    bench_id: benchId,
                    seat_number: assignedStudents.length + 1,
                    student_id: studentId,
                    semester: semester,
                    assigned_at: new Date().toISOString()
                });
                break;
            }
        }
    });

    return seatAssignments;
};

exports.assignSeating = (req, res) => {
    try {
        const { students, benches } = req.body;

        if (!students || !benches) {
            return res.status(400).json({ error: "Both 'students' and 'benches' must be provided" });
        }

        const assignments = assignExamSeating(students, benches);
        res.json({ assignments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
