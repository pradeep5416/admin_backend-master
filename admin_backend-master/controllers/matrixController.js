// controllers/matrixController.js
const matrixModel = require('../models/matrixModel');

const saveMatrixData = async (req, res) => {
  const { parameterNames, zoneNames, dataRate } = req.body;

  try {
    const result = await matrixModel.saveMatrixData({ parameterNames, zoneNames, dataRate });
    res.status(200).json(result);
  } catch (error) {
    console.error('Controller: Error saving matrix data:', error);
    res.status(500).json({ error: 'Error saving matrix data' });
  }
};

module.exports = { saveMatrixData };
