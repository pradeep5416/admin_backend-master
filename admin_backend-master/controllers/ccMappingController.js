// ccMappingController.js
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const { connectToMongoDB, closeMongoDBConnection } = require('../config/db.config.js'); // Assuming you have a file for MongoDB connection

const clientCarrierMappingModel = mongoose.model('clientcarrierMapping', {
  client: String,
  client_id: String,
  carrier: String,
  carrier_id: String,
});

exports.getClients = async (req, res) => {
  try {
    const db = client.db('admintable');
    const collection = db.collection('client-details');
    const clients = await collection.find().toArray();
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCarriers = async (req, res) => {
  try {
    const db = client.db('admintable');
    const collection = db.collection('carrier-details');
    const carriers = await collection.find().toArray();
    res.json(carriers);
  } catch (error) {
    console.error('Error fetching carriers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.saveClientMapping = async (req, res) => {
  const { client, client_id, carrier, carrier_id } = req.body;

  try {
    const mapping = new clientCarrierMappingModel({
      client_id,
      carrier_id,
    });

    await mapping.save();

    res.status(200).json({ success: true, message: 'Mapping data saved successfully' });
  } catch (error) {
    console.error('Error saving mapping data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
