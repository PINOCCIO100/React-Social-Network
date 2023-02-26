const { Router } = require("express");
const { getAddressedMessages, getAllSendedMessages, getUsersIDWithDialogs, sendMessage } = require("../controllers/messagesController");

const messagesRoute = Router();

messagesRoute.get('/sended', getAllSendedMessages)

messagesRoute.get('/users', getUsersIDWithDialogs)

messagesRoute.get('/:accepterID', getAddressedMessages)

messagesRoute.post('/send', sendMessage)

exports.messagesRoute = messagesRoute;