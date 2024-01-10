// emailsController.js
const { MongoClient } = require('mongodb');

exports.getEmails = async (req, res) => {
  try {
    const db = client.db('admintable');
    const collection = db.collection('firebase-users');
    const emails = await collection.find().toArray();
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
