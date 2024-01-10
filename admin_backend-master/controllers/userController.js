// userController.js

const mongoose = require('mongoose');
const aws = require('../config/awsConfig.js');
const upload = require('../config/multerConfig.js');
const User = require('../models/userModel'); // Assuming you have a user model defined in userModel.js

const handleUserUpload = async (req, res) => {
  try {
    const { clientId, carrier, name, source, destination, chargeCode, isDate } = req.body;
    const csvFileData = req.file.buffer;
    const csvFileKey = `pdf/${clientId}/${carrier}/${name}/${Date.now()}.csv`;
    const uploadDateTime = new Date();
    const params = {
      Bucket: 'reactjsapp-naveen',
      Key: csvFileKey,
      Body: csvFileData,
    };

    await aws.upload(params).promise();

    const csvFileUrl = `https://reactjsapp-naveen.s3.ap-south-1.amazonaws.com/${csvFileKey}`;

    const { email } = req.params;

    const user = new User({
      clientId,
      carrier,
      name,
      csvFileUrl,
      email,
      source,
      uploadDateTime,
      destination,
      chargeCode,
      isDate,
    });

    await user.save();
    res.status(201).json({ message: 'User data and CSV file link saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const handleUsermapUpload = async (req, res) => {
  try {
    const { clientId, carrier, name, source, destination, chargeCode, isDate } = req.body;
    const csvFileData = req.file.buffer;
    const csvFileKey = `pdfmap/${clientId}/${carrier}/${name}/${Date.now()}.csv`;
    const uploadDateTime = new Date();
    const params = {
      Bucket: 'reactjsapp-naveen',
      Key: csvFileKey,
      Body: csvFileData,
    };

    await aws.upload(params).promise();

    const csvFileUrl = `https://reactjsapp-naveen.s3.ap-south-1.amazonaws.com/${csvFileKey}`;

    const { email } = req.params;

    const usermap = new User({
      clientId,
      carrier,
      name,
      csvFileUrl,
      email,
      source,
      uploadDateTime,
      destination,
      chargeCode,
      isDate,
    });

    await usermap.save();
    res.status(201).json({ message: 'User data and CSV file link saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { handleUserUpload, handleUsermapUpload };
