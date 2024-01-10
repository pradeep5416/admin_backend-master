const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const multer = require('multer');
const aws = require('aws-sdk');
const { ObjectId } = require('mongodb');
const { handleUserUpload, handleUsermapUpload } = require('./controllers/userController');
const matrixController = require('./controllers/matrixController');
const app = express();
const connectDB = require('./config/db.config.js');
const { getUserTableData } = require('./controllers/userTableController');
const { deleteUser } = require('./controllers/deleteController');
const { addUsers } = require('./controllers/addUsersController');
const { getUsers, getUserDetails } = require('./controllers/getUsersController');
const { modifyUserRole } = require('./controllers/modifyUsersController');
const { getUsersByRole } = require('./controllers/getUsersByRolesController');
const Person = require('./models/personModel');
const accessController = require('./controllers/accessController');
const { saveFirebaseUser } = require('./controllers/firebaseController');
const { saveCarrierDetails } = require('./controllers/carrierDetailsController');
const { saveClientDetails } = require('./controllers/clientDetailsController');
const ccMappingController = require('./controllers/ccMappingController');
const emailsController = require('./controllers/emailsController');
const userClientMappingController = require('./controllers/userClientMappingController');
const uidController = require('./controllers/uidController');
const clientIdController = require('./controllers/clientIdController');
const profileController = require('./controllers/profileController');

const port = process.env.PORT || 5000;

connectDB();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const DataModel = mongoose.model('Data', {
  parameter: String,
  description: String,
});


app.post('/upload/:email', upload.single('csvFile'), handleUserUpload);
app.post('/uploadmap/:email', upload.single('csvFile'), handleUsermapUpload);
app.post('/api/saveMatrix', matrixController.saveMatrixData);
app.get('/usertabledata/:email', getUserTableData);
app.delete('/delete/:email', deleteUser);
app.post('/addusers', addUsers);
app.get('/getusers', getUsers);
app.get('/getuserdetails', getUserDetails);
app.patch('/modify/users/modifyRole', modifyUserRole);
app.get('/modify/users', getUsersByRole);

app.post('/api/people', accessController.addPerson);
app.get('/api/people', accessController.getPeople);
app.put('/api/assign/:personId/:assignedToId', accessController.assignPerson);
app.get('/api/person/:personId', accessController.getPersonDetails);
app.get('/api/assigned-people/:assignedPersonId', accessController.getAssignedPeople);
app.delete('/api/people/:personId', accessController.deletePerson);
app.post('/api/login', accessController.login);

app.post('/firebase', saveFirebaseUser);

app.post('/carrierdetails', saveCarrierDetails);
app.post('/clientdetails', saveClientDetails);

app.get('/api/getClients', ccMappingController.getClients);
app.get('/api/getCarriers', ccMappingController.getCarriers);
app.post('/api/saveClientMapping1', ccMappingController.saveClientMapping);

app.get('/api/getEmails', emailsController.getEmails);
app.post('/api/saveClientMapping2', userClientMappingController.saveClientMapping);

app.get('/api/getUids', uidController.getUids);
app.get('/api/getDataByEmailUid', uidController.getDataByEmailUid);
app.get('/api/getClientIds', clientIdController.getClientIds);
app.get('/api/getDataByClientId', clientIdController.getDataByClientId);

app.get('/api/getProfileData', profileController.getProfileData);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});