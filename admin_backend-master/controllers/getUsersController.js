// getUsersController.js
const { client } = require('../config/db.config.js'); 

exports.getUsers = async (req, res) => {
  const db = client.db('admintable');
  const collection = db.collection('usersdetails');

  try {
    const users = await collection.find().toArray();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

exports.getUserDetails = async (req, res) => {
  const { email, phoneNumber } = req.query;

  if (!email && !phoneNumber) {
    return res.status(400).json({ message: 'Please provide either email or phoneNumber in the query parameters.' });
  }

  const db = client.db('admintable');
  const collection = db.collection('usersdetails');

  try {
    let query = {};

    if (email) {
      query = { email };
    } else if (phoneNumber) {
      query = { phoneNumber };
    }

    const userDetails = await collection.findOne(query);

    if (!userDetails) {
      return res.status(404).json({ message: 'User not found with the specified criteria.' });
    }

    res.status(200).json(userDetails);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ message: 'Failed to fetch user details.' });
  }
};
