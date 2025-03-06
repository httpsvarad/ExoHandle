const express = require("express");
const {
  addSubjectsToDivision,
  assignTeachersToDivision,
} = require("../controllers/divisionControllerAsiign");
const {
    assignStudentsToDivision,
    assignStudentsToSemester,
  } = require("../controllers/studentsDivSem");
const router = express.Router();

router.post("/add-subjects", addSubjectsToDivision);
router.post("/assign-teachers", assignTeachersToDivision);
router.post("/assign-division", assignStudentsToDivision);
router.post("/assign-semester", assignStudentsToSemester);

module.exports = router;
