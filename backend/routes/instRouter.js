const express = require('express');
const router = express.Router();
const {
  getAllInstitutes,
  getInstituteById,
  createInstitute,
  updateInstitute,
  deleteInstitute,
} = require('../controllers/instituteController');

router.get('/', getAllInstitutes);
router.get('/:id', getInstituteById);
router.post('/', createInstitute);
router.put('/:id', updateInstitute);
router.delete('/:id', deleteInstitute);

module.exports = router;
