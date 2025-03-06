const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all divisions, including the related semester data
async function getAllDivisions(req, res) {
  try {
    console.log("hey")
    const divisions = await prisma.division.findMany({
      include: { semester: true },
    });
    res.status(200).json(divisions);
  } catch (error) {
    console.error('Error retrieving divisions:', error);
    res.status(500).json({ error: 'Error retrieving divisions.' });
  }
}

// Get a single division by its ID
async function getDivisionById(req, res) {
  const id = parseInt(req.params.id, 10);
  try {
    console.log("hey")
    const division = await prisma.division.findUnique({
      where: { id },
      include: { semester: true } ,
    });
    if (!division) {
      return res.status(404).json({ error: 'Division not found.' });
    }
    res.status(200).json(division);
  } catch (error) {
    console.error('Error retrieving division:', error);
    res.status(500).json({ error: 'Error retrieving division.' });
  }
}

// Create a new division
async function createDivision(req, res) {
  const { semesterId, name ,instituteId} = req.body;
  try {
    const newDivision = await prisma.division.create({
      data: { semesterId, name ,instituteId},
    });
    res.status(201).json(newDivision);
  } catch (error) {
    console.error('Error creating division:', error);
    res.status(500).json({ error: 'Error creating division.' });
  }
}

// Update an existing division by ID
async function updateDivision(req, res) {
  const id = parseInt(req.params.id, 10);
  const { semesterId, name } = req.body;
  try {
    const updatedDivision = await prisma.division.update({
      where: { id },
      data: { semesterId, name },
    });
    res.status(200).json(updatedDivision);
  } catch (error) {
    console.error('Error updating division:', error);
    res.status(500).json({ error: 'Error updating division.' });
  }
}

// Delete a division by ID
async function deleteDivision(req, res) {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.division.delete({ where: { id } });
    res.status(200).json({ message: 'Division deleted successfully.' });
  } catch (error) {
    console.error('Error deleting division:', error);
    res.status(500).json({ error: 'Error deleting division.' });
  }
}




module.exports = {
  getAllDivisions,
  getDivisionById,
  createDivision,
  updateDivision,
  deleteDivision,
};
