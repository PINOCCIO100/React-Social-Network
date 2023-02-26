const Messages = require("../models/Messages");

exports.getAllSendedMessages = async (req, res) => {
  try {
    const senderID = req.session.id
    const messages = await Messages.find({ senderID })
    res.json(messages)
  } catch (e) {
    console.log(e.messages);
  }
}

exports.getAddressedMessages = async (req, res) => {
  try {
    const { accepterID } = req.params;
    const senderID = req.session.id
    const messages = await Messages.find({
      $or:
        [
          { senderID: senderID, accepterID },
          { accepterID: senderID, senderID: accepterID } // TODO: Не нравится путаница с senderID и accepterID
        ]
    }, { __v: 0 }).sort({ sendDate: 1 })
    res.json(messages)
  } catch (e) {
    console.log(e.messages);
  }
}

exports.getUsersIDWithDialogs = async (req, res) => {
  try {
    const senderID = req.session.id
    const usersID = await Messages.distinct('accepterID', { senderID });
    res.json(usersID)
  } catch (e) {
    console.log(e.messages);
  }
}

exports.sendMessage = async (req, res) => {
  const senderID = req.session.id;
  const { accepterID, message } = req.body;
  try {
    if (message == '' || !message) throw new Error('Empty message!')
    const messageBody = {
      senderID,
      accepterID,
      message,
      sendDate: Date.now()
    };
    await Messages.create(messageBody);
    res.json({
      resultCode: 0,
      data: messageBody,
      message: []
    })
  } catch (e) {
    res.json({
      resultCode: 1,
      message: [e.message]
    })
  }
}