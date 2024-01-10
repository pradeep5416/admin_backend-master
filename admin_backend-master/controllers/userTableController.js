// userTableController.js
const { client } = require('../config/db.config.js'); // Assuming you have an existing connection

exports.getUserTableData = async (req, res) => {
  const { email } = req.params;

  try {
    const db = client.db('admintable');
    
    // Find all documents in the 'users' collection that match the user's email
    const userTableData = await db.collection('users').find({ email }).toArray();
    
    res.status(200).json(userTableData);
  } catch (err) {
    console.error('Error fetching user table data:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
