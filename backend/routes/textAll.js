const express = require("express");
const router = express.Router();
const testController = require("../controllers/testControllerAll");

router.post("/create", testController.createTest);
router.put("/edit/:testId", testController.editTest);
router.post("/assign-marks", testController.assignMarks);
router.get("/marks/:studentId", testController.getStudentMarks);
router.get("/analysis/:testId", testController.getTestAnalysis);

module.exports = router;
