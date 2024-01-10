// carrierDetailsController.js
const { MongoClient, ObjectId } = require('mongodb');
const { connectToMongoDB, closeMongoDBConnection } = require('../config/db.config.js'); // Assuming you have a file for MongoDB connection

exports.saveCarrierDetails = async (req, res) => {
  let client;

  try {
    client = await connectToMongoDB();

    const { name, location } = req.body;
    const database = client.db('admintable');
    const result = await database.collection('carrier-details').insertOne({
      _id: new ObjectId(),
      name,
      location,
    });

    res.status(200).json({ message: 'Carrier details saved successfully', carrierId: result.insertedId });
  } catch (error) {
    console.error('Error saving carrier details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (client) {
      await closeMongoDBConnection(client);
    }
  }
};
