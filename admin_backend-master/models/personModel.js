// models/personModel.js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  phoneNumber: String,
  role: String,
  assignedTo: mongoose.Types.ObjectId,

});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
