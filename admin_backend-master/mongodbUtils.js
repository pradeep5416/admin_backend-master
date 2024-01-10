// mongodbUtils.js
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://naveen:naveen@cluster0.5tln1lv.mongodb.net?retryWrites=true&w=majority'; 

async function saveToMongoDB(userData) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('admintable');
    const collection = database.collection('firebase-users');

    // Insert user data into MongoDB
    await collection.insertOne(userData);
  } finally {
    await client.close();
  }
}

module.exports = { saveToMongoDB };
