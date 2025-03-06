const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Create a Test
 */
exports.createTest = async (req, res) => {
  try {
    const { divisionId, testScore } = req.body;

    if (!divisionId || !testScore) {
      return res.status(400).json({ error: "Division ID and Test Score are required." });
    }

    const test = await prisma.text_tables.create({
      data: {
        divisionId,
        testscore: testScore,
        updatedAt: new Date(),
      },
    });

    res.status(201).json(test);
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ error: "Failed to create test" });
  }
};

/**
 * Edit a Test
 */
exports.editTest = async (req, res) => {
  try {
    const { testId } = req.params;
    const { testScore } = req.body;

    if (!testScore) {
      return res.status(400).json({ error: "Test Score is required." });
    }

    const updatedTest = await prisma.text_tables.update({
      where: { id: parseInt(testId) },
      data: { testscore: testScore, updatedAt: new Date() },
    });

    res.status(200).json(updatedTest);
  } catch (error) {
    console.error("Error editing test:", error);
    res.status(500).json({ error: "Failed to update test" });
  }
};

/**
 * Assign Marks to a Student
 */
exports.assignMarks = async (req, res) => {
  try {
    const { studentId, subjectId, testId, obtained, total } = req.body;

    if (!studentId || !subjectId || !testId || obtained == null || !total) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const marks = await prisma.testMarks.create({
      data: {
        studentId,
        subjectId,
        testId,
        obtained,
        total,
        createdAt: new Date(),
      },
    });

    res.status(201).json(marks);
  } catch (error) {
    console.error("Error assigning marks:", error);
    res.status(500).json({ error: "Failed to assign marks" });
  }
};

/**
 * Get Marks by Student ID
 */
exports.getStudentMarks = async (req, res) => {
  try {
    const { studentId } = req.params;

    const marks = await prisma.testMarks.findMany({
      where: { studentId: parseInt(studentId) },
      include: { Subject: true, text_tables: true },
    });

    res.status(200).json(marks);
  } catch (error) {
    console.error("Error fetching student marks:", error);
    res.status(500).json({ error: "Failed to fetch marks" });
  }
};

/**
 * Get Test Analysis (Average, Highest, Lowest Marks)
 */
exports.getTestAnalysis = async (req, res) => {
  try {
    const { testId } = req.params;

    const testMarks = await prisma.testMarks.findMany({
      where: { testId: parseInt(testId) },
      select: { obtained: true, total: true },
    });

    if (testMarks.length === 0) {
      return res.status(404).json({ error: "No marks found for this test" });
    }

    const obtainedScores = testMarks.map((m) => m.obtained);
    const totalScores = testMarks.map((m) => m.total);
    const totalMax = totalScores[0]; // Assuming all students have the same total marks

    const highest = Math.max(...obtainedScores);
    const lowest = Math.min(...obtainedScores);
    const average = obtainedScores.reduce((sum, score) => sum + score, 0) / obtainedScores.length;

    res.status(200).json({ highest, lowest, average, totalMax });
  } catch (error) {
    console.error("Error fetching test analysis:", error);
    res.status(500).json({ error: "Failed to get test analysis" });
  }
};
