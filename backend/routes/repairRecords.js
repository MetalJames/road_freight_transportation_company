const express = require('express');
const RepairRecord = require('../models/RepairRecord');
const router = express.Router();

// Handler functions
// Fetch Repair Records
const getAllRepairRecords = async (req, res) => {
    try {
        const repairRecords = await RepairRecord.find({});
        res.status(200).json(repairRecords);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllRepairRecords);
// router.post('/', createRepairRecord);
// router.put('/:id', updateRepairRecord);
// router.delete('/:id', deleteRepairRecord);

// Export handlers for testing
module.exports = {
    router,
    getAllRepairRecords,
    // createRepairRecord,
    // updateRepairRecord,
    // deleteRepairRecord
};