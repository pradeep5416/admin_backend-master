// deleteController.js
const { client, s3 } = require('../config/awsConfig.js'); 

exports.deleteUser = async (req, res) => {
  const emailToDelete = req.params.email;
  const db = client.db('admintable'); // Replace 'admintable' with your database name
  const collection = db.collection('users');

  try {
    // Check if the user exists in the MongoDB collection
    const user = await collection.findOne({ email: emailToDelete });
    if (!user) {
      return res.status(404).json({ message: 'User data not found' });
    }

    const csvFileUrl = user.csvFileUrl;
    const csvFileKey = csvFileUrl.split('/').pop(); // Extract the file key from the URL

    // Delete the user's PDF file from S3
    const s3Params = {
      Bucket: 'reactjsapp-naveen', // Replace with your S3 bucket name
      Key: `pdfs/${csvFileKey}`,
    };

    s3.deleteObject(s3Params, (err, data) => {
      if (err) {
        console.error('Error deleting file from S3:', err);
        return res.status(500).json({ message: 'Failed to delete user data from AWS S3' });
      }

      // After successfully deleting the file from S3, delete the user data from the MongoDB collection
      collection.deleteOne({ email: emailToDelete }, (err, result) => {
        if (err) {
          console.error('Error deleting user data from MongoDB:', err);
          return res.status(500).json({ message: 'Failed to delete user data from MongoDB' });
        }

        // If both S3 and MongoDB deletions are successful, respond with a success message
        res.status(200).json({ message: 'User data and file deleted successfully' });
      });
    });
  } catch (err) {
    console.error('Error deleting user data:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
