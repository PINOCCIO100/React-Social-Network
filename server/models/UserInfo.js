const mongoose = require('mongoose');
require('../models/Status');

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, minLength: 5, unique: true, required: true },
  address: {
    city: String,
    street: String,
  },
  phone: String,
  website: String,
  company: {
    name: String,
    catchPhrase: String,
  },
  password: String,
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status'
  },
}, { collection: "usersInfo" });


module.exports = new mongoose.model('UserInfo', userSchema);