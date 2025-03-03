const express = require('express');
const router = express.Router();
const {
  getAllSemesters,
  getSemesterById,
  createSemester,
  updateSemester,
  deleteSemester,
} = require('../controllers/SemisterController'); // Adjust the path as needed

router.get('/', getAllSemesters);
router.get('/:id', getSemesterById);
router.post('/', createSemester);
router.put('/:id', updateSemester);
router.delete('/:id', deleteSemester);

module.exports = router;
