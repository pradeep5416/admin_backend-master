// modifyUsersController.js
const { client } = require('../config/db.config.js'); 

exports.modifyUserRole = async (req, res) => {
  try {
    const { email, newRole } = req.body;
    const db = client.db('admintable');
    const usersCollection = db.collection('usersdetails');

    // Find the user by email and update the role
    const user = await usersCollection.findOneAndUpdate({ email }, { $set: { role: newRole } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
