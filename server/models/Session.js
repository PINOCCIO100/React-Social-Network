const mongoose = require("mongoose");

// TODO: замутить expirationTime

const sessionSchema = new mongoose.Schema({
  session: { type: String, unique: true, required: true },
  id: { type: Number, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  expirationTime: Number,
}, { collection: 'sessions' })

module.exports = new mongoose.model('Session', sessionSchema);