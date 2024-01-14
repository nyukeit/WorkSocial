const express = require("express");

const router = express.Router();
const GroupChatController = require("../controllers/GroupChatController");

const { verifyToken } = require("../middleware/auth");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

router.get("/groupchats", GroupChatController.getAllGroupChats);
router.get("/groupchats/:groupChatId", GroupChatController.getGroupChatById);
router.post("/groupchats", GroupChatController.createGroupChat);
router.delete("/groupchats/:groupChatId", GroupChatController.deleteGroupChat);

module.exports = router;
