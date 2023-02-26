const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  senderID: { type: Number, required: true },
  accepterID: { type: Number, required: true },
  post: { type: String, required: true },
  rating: {
    likes: [Number],
    dislikes: [Number],
  },
  postDate: Date
}, { collection: 'posts' })

module.exports = new mongoose.model('Post', postSchema)