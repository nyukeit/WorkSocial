const express = require("express");

const router = express.Router();
const EventInvitesController = require("../controllers/EventInvitesController");

const { verifyToken } = require("../middleware/auth");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

router.get(
  "/events/:eventId/invites",
  EventInvitesController.getInvitesByEventId
);
router.post("/events/:eventId/invites", EventInvitesController.inviteUser);
router.put(
  "/events/:eventId/invites",
  EventInvitesController.acceptDeclineInvite
);
router.delete("/events/:eventId/invites", EventInvitesController.unInviteUser);

module.exports = router;
