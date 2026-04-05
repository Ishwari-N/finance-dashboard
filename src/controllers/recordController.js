const recordService = require('../services/recordService');

const createRecord = async (req, res) => {
    try {
        const { userId, amount, type, category, description } = req.body;

        if (!userId || !amount || !type || !category) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const record = await recordService.addRecord(userId, amount, type, category, description);
        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserRecords = async (req, res) => {
    try {
        const { userId } = req.params;
        const records = await recordService.getRecordsByUser(userId);
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getReport = async (req, res) => {
    try {
        const { userId } = req.params;
        const summary = await recordService.getFinanceSummary(userId);
        res.status(200).json(summary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- NEW CRUD OPERATIONS ---

const updateExistingRecord = async (req, res) => {
    try {
        const { id } = req.params; // The ID of the record to update
        const { amount, type, category, description } = req.body;
        
        const updated = await recordService.updateRecord(id, amount, type, category, description);
        
        if (!updated) {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removeRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await recordService.deleteRecord(id);
        
        if (!success) {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json({ message: "Record deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { 
    createRecord, 
    getUserRecords, 
    getReport, 
    updateExistingRecord, 
    removeRecord 
};