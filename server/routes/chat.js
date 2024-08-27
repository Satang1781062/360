const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, getUserChats, markAsRead } = require('../controllers/chat');
const { auth, adminCheck } = require('../middleware/auth');

router.post('/chat/send', auth, sendMessage);
router.get('/chat/messages/:userId', auth, getMessages);
router.get('/chat/user-chats', auth, adminCheck, getUserChats); // สำหรับ admin
router.put('/chat/read/:messageId', auth, markAsRead);

module.exports = router;
