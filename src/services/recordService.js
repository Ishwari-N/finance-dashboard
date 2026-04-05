const db = require('../config/db');

const addRecord = async (userId, amount, type, category, description) => {
    const query = `
        INSERT INTO records (user_id, amount, type, category, description)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [userId, amount, type.toUpperCase(), category, description];
    const { rows } = await db.query(query, values);
    return rows[0];
};

const getRecordsByUser = async (userId) => {
    const query = `SELECT * FROM records WHERE user_id = $1 ORDER BY date DESC;`;
    const { rows } = await db.query(query, [userId]);
    return rows;
};

const deleteRecord = async (id) => {
    const { rowCount } = await db.query('DELETE FROM records WHERE id = $1', [id]);
    return rowCount > 0;
};

const updateRecord = async (id, amount, type, category, description) => {
    const query = `
        UPDATE records 
        SET amount = $2, type = $3, category = $4, description = $5 
        WHERE id = $1 RETURNING *;
    `;
    const values = [id, amount, type.toUpperCase(), category, description];
    const { rows } = await db.query(query, values);
    return rows[0];
};

const getFinanceSummary = async (userId) => {
    const query = `
        SELECT 
            COALESCE(SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END), 0) as total_income,
            COALESCE(SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END), 0) as total_expense
        FROM records 
        WHERE user_id = $1;
    `;
    const { rows } = await db.query(query, [userId]);
    
    const { total_income, total_expense } = rows[0];
    const balance = parseFloat(total_income) - parseFloat(total_expense);

    return {
        totalIncome: parseFloat(total_income),
        totalExpense: parseFloat(total_expense),
        balance: balance
    };
};

module.exports = { addRecord, getRecordsByUser, getFinanceSummary, deleteRecord, updateRecord };