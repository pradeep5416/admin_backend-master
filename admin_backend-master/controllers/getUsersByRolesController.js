// getUsersController.js
const { client } = require('../config/db.config.js'); 

exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;
    const db = client.db('admintable');
    const usersCollection = db.collection('usersdetails');

    const filter = role ? { role } : {};

    const users = await usersCollection.find(filter).toArray();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
