const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllInstitutes(req, res) {
  try {
    const institutes = await prisma.institute.findMany();
    res.status(200).json(institutes);
    console.log("hey")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving institutes.' });
  }
}

async function getInstituteById(req, res) {
  const id = parseInt(req.params.id, 10);
  try {
    const institute = await prisma.institute.findUnique({ where: { id } });
   
    if (!institute) {
      return res.status(404).json({ error: 'Institute not found.' });
    }
    res.status(200).json(institute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving institute.' });
  }
}

async function createInstitute(req, res) {
  const { createdBy, noOfClassRooms, noOfStudents, noOfTeachers, noOfSemesters, noOfBenches } = req.body;
  try {
    
    const newInstitute = await prisma.institute.create({
      data: { createdBy, noOfClassRooms, noOfStudents, noOfTeachers, noOfSemesters, noOfBenches }
    });
    res.status(201).json(newInstitute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating institute.' });
  }
}

async function updateInstitute(req, res) {
  const id = parseInt(req.params.id, 10);
  try {
    const updatedInstitute = await prisma.institute.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json(updatedInstitute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating institute.' });
  }
}

async function deleteInstitute(req, res) {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.institute.delete({ where: { id } });
    res.status(200).json({ message: 'Institute deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting institute.' });
  }
}

module.exports = {
  getAllInstitutes,
  getInstituteById,
  createInstitute,
  updateInstitute,
  deleteInstitute,
};
