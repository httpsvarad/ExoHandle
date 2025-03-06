const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/:id', notificationController.getNotification);
router.post('/send', notificationController.sendNotification);
router.patch('/read/:id', notificationController.readNotification);
router.patch('/unread/:id', notificationController.unreadNotification);

module.exports = router;
