const pool = require('./db');
const fs = require('fs');
const path = require('path');

const initDatabase = async () => {
  try {
    const sqlPath = path.join(__dirname, '../models/dbSchema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    await pool.query(sql);
    console.log("✅ Database tables initialized successfully");
  } catch (err) {
    console.error("❌ Error initializing database:", err);
  }
};

module.exports = initDatabase;