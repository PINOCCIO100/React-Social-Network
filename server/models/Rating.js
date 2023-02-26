const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  objID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  objType: {
    type: String,
    required: true,
    enum: ['post','comment','photo'],
  },
  userID: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    enum: [-1, 1],
    required: true,
  }
}, { collection: 'ratings' });

module.exports = new mongoose.model('Rating', ratingSchema);