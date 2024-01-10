// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clientId: String,
  carrier: String,
  name: String,
  csvFileUrl: String,
  email: String,
  source: String,
  uploadDateTime: Date,
  destination: String,
  chargeCode: String,
  isDate: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
