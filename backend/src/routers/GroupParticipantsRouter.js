const express = require("express");

const router = express.Router();
const GroupParticipantsController = require("../controllers/GroupParticipantsController");

const { verifyToken } = require("../middleware/auth");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

router.get(
  "/groupchats/:groupChatId/participants",
  GroupParticipantsController.getAllParticipants
);
router.post(
  "/groupchats/:groupChatId/participants",
  GroupParticipantsController.addParticipant
);
router.delete(
  "/groupchats/:groupChatId/participants/:userId",
  GroupParticipantsController.removeParticipant
);

module.exports = router;
