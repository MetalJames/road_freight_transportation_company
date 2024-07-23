const express = require('express');
const RepairRecord = require('../models/RepairRecord');
const router = express.Router();

// Route for fetching employees
router.get('/', async (req, res) => {
    try {
        const repairRecords = await RepairRecord.find({});
        res.status(200).json(repairRecords);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;