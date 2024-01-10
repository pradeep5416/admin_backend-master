const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://naveen:naveen@cluster0.5tln1lv.mongodb.net?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.json());
app.use(cors()); 

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://naveen:naveen@cluster0.5tln1lv.mongodb.net?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'admintable',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

module.exports = connectDB;
