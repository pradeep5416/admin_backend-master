// clientDetailsController.js
const { MongoClient, ObjectId } = require('mongodb');
const { connectToMongoDB, closeMongoDBConnection } = require('../config/db.config.js');  // Assuming you have a file for MongoDB connection

exports.saveClientDetails = async (req, res) => {
  let client;

  try {
    client = await connectToMongoDB();

    const { name, location, contact, comment, client_id } = req.body;
    const database = client.db('admintable');
    const result = await database.collection('client-details').insertOne({
      _id: new ObjectId(),
      name,
      location,
      contact,
      comment,
      client_id,
    });

    res.status(200).json({ message: 'Client details saved successfully', clientId: result.insertedId });
  } catch (error) {
    console.error('Error saving client details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (client) {
      await closeMongoDBConnection(client);
    }
  }
};
