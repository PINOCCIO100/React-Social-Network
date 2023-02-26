const mongoose = require('mongoose');

const followsSchema = new mongoose.Schema({
  id: Number,
  follows: [Number],
  followers: [Number],
}, { collection: 'follows' });

module.exports = new mongoose.model('Follow', followsSchema);

