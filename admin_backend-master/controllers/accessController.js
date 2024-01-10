// accessSettingsController.js
const Person = require('../models/personModel');
const bcrypt = require('bcrypt');

exports.addPerson = async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();
    res.json(savedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPeople = async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignPerson = async (req, res) => {
  try {
    const { personId, assignedToId } = req.params;
    const updatedPerson = await Person.findByIdAndUpdate(personId, { assignedTo: assignedToId }, { new: true });

    if (!updatedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json(updatedPerson);
  } catch (error) {
    console.error('Error assigning person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getPersonDetails = async (req, res) => {
  try {
    const personId = req.params.personId;
    const person = await Person.findById(personId);

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    const assignedPeopleCount = await Person.countDocuments({ assignedTo: personId });

    res.json({
      ...person.toObject(),
      assignedPeopleCount,
    });
  } catch (error) {
    console.error('Error fetching person details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAssignedPeople = async (req, res) => {
  try {
    const assignedPersonId = req.params.assignedPersonId;
    const assignedPeople = await Person.find({ assignedTo: assignedPersonId });
    res.json(assignedPeople);
  } catch (error) {
    console.error('Error fetching assigned people details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const personId = req.params.personId;
    await Person.findByIdAndDelete(personId);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const person = await Person.findOne({ username });

    if (!person || !bcrypt.compareSync(password, person.password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({
      _id: person._id,
      username: person.username,
      email: person.email,
      phoneNumber: person.phoneNumber,
      role: person.role,
    });
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
