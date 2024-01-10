// models/matrixModelPostgreSQL.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Pradeep@123',
  port: 5432,
});

// Check if the connection to PostgreSQL is successful
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err))
  .finally(() => pool.end());

const saveMatrixDataPostgreSQL = async ({ parameterNames, zoneNames, dataRate }) => {
  try {
    // Use parameterized query to prevent SQL injection
    const query = 'INSERT INTO matrices(parameter_names, zone_names, data_rate) VALUES($1, $2, $3)';
    const values = [parameterNames, zoneNames, dataRate];

    await pool.query(query, values);

    return { message: 'Matrix data saved successfully to PostgreSQL' };
  } catch (error) {
    console.error('Error saving matrix data to PostgreSQL:', error);
    throw new Error('Error saving matrix data to PostgreSQL');
  }
};

module.exports = { saveMatrixDataPostgreSQL };
