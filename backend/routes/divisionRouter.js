const express = require('express');
const router = express.Router();
const {
  getAllDivisions,
  getDivisionById,
  createDivision,
  updateDivision,
  deleteDivision,
} = require('../controllers/divisionController'); // Adjust the path if needed

router.get('/', getAllDivisions);
router.get('/:id', getDivisionById);
router.post('/', createDivision);
router.put('/:id', updateDivision);
router.delete('/:id', deleteDivision);

module.exports = router;
