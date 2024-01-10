// uidController.js
const { MongoClient } = require('mongodb');

exports.getUids = async (req, res) => {
  try {
    const db = client.db('admintable'); // Replace with your actual database name
    const collection = db.collection('userclientmappings'); // Replace with your actual collection name
    const uids = await collection.find({}, { projection: { _id: 0, email_uid: 1 } }).toArray();
    res.json(uids.map(({ email_uid }) => email_uid));
  } catch (error) {
    console.error('Error fetching UIDs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getDataByEmailUid = async (req, res) => {
  const { email_uid } = req.query;

  try {
    const db = mongoose.connection.useDb('admintable');
    const collection = db.collection('userclientmappings');

    const data = await collection.find({ email_uid }).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data by email_uid:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
