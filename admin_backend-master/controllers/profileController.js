// profileController.js
const mongoose = require('mongoose');

exports.getProfileData = async (req, res) => {
  const { email } = req.query;

  try {
    // Use the specified database and collection for profile data
    const db = mongoose.connection.useDb('admintable');
    const collection = db.collection('firebase-users');

    // Fetch profile data based on the decrypted email
    const profileData = await collection.findOne({ email });

    if (!profileData) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profileData);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
