const { Pool } = require('pg');
require('dotenv').config();

// The Pool allows multiple simultaneous connections to the database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection logic
pool.on('connect', () => {
  console.log('🐘 PostgreSQL Pool connected');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};