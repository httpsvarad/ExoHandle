const express = require("express")
const router = express.Router();
const setupController = require("../controllers/setupController")

router.post('/dumpInstitutes', setupController.createInstitutes);
router.post('/dumpSemesters', setupController.createSemesters);
router.post('/dumpDivisions', setupController.createDivisions);
router.post("/dumpBatches", setupController.createBatches);
router.post("/dumpClassrooms", setupController.createClassrooms);

module.exports = router;