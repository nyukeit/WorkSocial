const express = require('express');
const router = express.Router();
const EventLikeController = require('../controllers/EventLikeController');


router.post('/events/:eventId/likes', EventLikeController.likeEvent);
router.delete('/events/:eventId/likes/:userId', EventLikeController.unlikeEvent);



module.exports = router;