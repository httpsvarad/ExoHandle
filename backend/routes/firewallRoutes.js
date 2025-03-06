const express = require("express");
const router = express.Router();
const { firewallCheck } = require("../controllers/firewallController");

// Define the route for firewall check
router.get("/firewall-check", firewallCheck);

module.exports = router;
