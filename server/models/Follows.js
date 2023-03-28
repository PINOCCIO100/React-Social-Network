const mongoose = require('mongoose');

const followsSchema = new mongoose.Schema({
  follower: {
    type: Number,
    required: true
  },
  followed: {
    type: Number,
    required: true
  },
}, { collection: 'follows' });

module.exports = new mongoose.model('Follow', followsSchema);

