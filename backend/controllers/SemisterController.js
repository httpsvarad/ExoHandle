const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all semesters (optionally include related institute details)
async function getAllSemesters(req, res) {
  try {
    
    const semesters = await prisma.semester.findMany({
      include: { institute: true },
    });
    res.status(200).json(semesters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving semesters.' });
  }
}

// Get a single semester by ID
async function getSemesterById(req, res) {
  const id = parseInt(req.params.id, 10);
  try {
    const semester = await prisma.semester.findUnique({
      where: { id },
      include: { institute: true },
    });
    if (!semester) {
      return res.status(404).json({ error: 'Semester not found.' });
    }
    res.status(200).json(semester);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving semester.' });
  }
}

// Create a new semester
async function createSemester(req, res) {
  const { instituteId, name } = req.body;
  try {
    console.log("hey")
    const newSemester = await prisma.semester.create({
      data: { instituteId, name },
    });
    res.status(201).json(newSemester);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating semester.' });
  }
}

// Update an existing semester
async function updateSemester(req, res) {
  const id = parseInt(req.params.id, 10);
  const { instituteId, name } = req.body;
  try {
    const updatedSemester = await prisma.semester.update({
      where: { id },
      data: { instituteId, name },
    });
    res.status(200).json(updatedSemester);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating semester.' });
  }
}

// Delete a semester
async function deleteSemester(req, res) {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.semester.delete({ where: { id } });
    res.status(200).json({ message: 'Semester deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting semester.' });
  }
}

module.exports = {
  getAllSemesters,
  getSemesterById,
  createSemester,
  updateSemester,
  deleteSemester,
};
