const express = require("express");
const router = express.Router();
const groupChatController = require("../controllers/groupChatController");
const protectRoute = require("../middleware/auth.middleware"); // Import middleware

// Create a new group chat (Only teachers & admins)
router.post("/", protectRoute, groupChatController.createGroupChat);

// Send a message to a group chat (Only teachers & admins)
router.post("/send", protectRoute, groupChatController.sendMessageToGroup);

// Get messages from a group chat
router.get("/:groupChatId", protectRoute, groupChatController.getGroupConversation);

module.exports = router;
