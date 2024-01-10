// addUsersController.js
const { client } = require('../config/db.config.js'); 

exports.addUsers = async (req, res) => {
  const userData = req.body;
  const db = client.db('admintable');
  const collection = db.collection('usersdetails');

  try {
    await collection.insertOne(userData);
    res.status(200).json({ message: 'User data saved successfully' });
  } catch (err) {
    console.error('Error saving user data:', err);
    res.status(500).json({ message: 'Failed to save user data' });
  }
};
