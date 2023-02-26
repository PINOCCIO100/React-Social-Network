const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  body: { type: String, required: true },
  date: { type: Date, required: true },

}, { collection: 'statuses' });

module.exports = new mongoose.model('Status', statusSchema);