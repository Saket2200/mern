const messageService = require('../services/messageService');

async function sendMessage(req, res) {
    const { senderId, receiverId, content } = req.body;
    try {
        await messageService.sendMessage(senderId, receiverId, content);
        res.status(201).send('Message sent successfully');
    } catch (error) {
        res.status(500).send('Error sending message');
    }
}

async function getMessages(req, res) {
    const userId = req.params.userId;
    try {
        const messages = await messageService.getMessages(userId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).send('Error retrieving messages');
    }
}

module.exports = { sendMessage, getMessages };
