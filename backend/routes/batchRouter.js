const express = require("express");
const router = express.Router();
const batchController = require("../controllers/batchController");

// API Endpoints
router.post("/", batchController.createBatch);
router.get("/", batchController.getAllBatches);
router.get("/:id", batchController.getBatchById);
router.put("/:id", batchController.updateBatch);
router.delete("/:id", batchController.deleteBatch);

module.exports = router;
