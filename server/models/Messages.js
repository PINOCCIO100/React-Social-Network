const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderID: {
    type: Number,
    required: true,
  },
  accepterID: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sendDate: Date,
}, { collection: 'messages' })

module.exports = new mongoose.model('Message', messageSchema)