// userClientMappingController.js
const mongoose = require('mongoose');

const userClientMappingModel = mongoose.model('userclientMapping', {
  client: String,
  client_id: String,
  email: String,
  email_uid: String,
});

exports.saveClientMapping = async (req, res) => {
  const { client, client_id, email, email_uid } = req.body;

  try {
    const mapping = new userClientMappingModel({
      client_id,
      email_uid,
    });

    await mapping.save();

    res.status(200).json({ success: true, message: 'Mapping data saved successfully' });
  } catch (error) {
    console.error('Error saving mapping data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
