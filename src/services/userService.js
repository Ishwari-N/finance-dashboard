const db = require('../config/db');

// This function handles the actual SQL query to save a user
const createUser = async (name, email, password, role = 'VIEWER') => {
    const query = `
        INSERT INTO users (name, email, password, role) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, name, email, role, status;
    `;
    const values = [name, email, password, role];
    
    // We use the db.query we created in our config/db.js
    const { rows } = await db.query(query, values);
    return rows[0];
};

module.exports = {
    createUser
};