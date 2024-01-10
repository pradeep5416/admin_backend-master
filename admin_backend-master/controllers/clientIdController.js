// clientIdController.js
const mongoose = require('mongoose');

exports.getClientIds = async (req, res) => {
  try {
    const db = mongoose.connection.useDb('admintable');
    const collection = db.collection('clientcarriermappings');

    const clientIds = await collection.distinct('client_id');
    res.json(clientIds);
  } catch (error) {
    console.error('Error fetching Client IDs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getDataByClientId = async (req, res) => {
  const { client_id } = req.query;

  try {
    const db = mongoose.connection.useDb('admintable');
    const collection = db.collection('clientcarriermappings');

    const data = await collection.find({ client_id }).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data by client_id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
