const { saveToMongoDB } = require('../mongodbUtils'); // Assuming you have a file for MongoDB utility functions

exports.saveFirebaseUser = async (req, res) => {
  try {
    const { email, uid, role } = req.body;
    await saveToMongoDB({ email, uid, role });

    res.status(200).json({ message: 'User data saved successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
