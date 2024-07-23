const express = require('express');
const Shipment = require('../models/Shipment');
const router = express.Router();

// Route for fetching shipments
router.get('/', async (req, res) => {
    try {
        const shipments = await Shipment.find({});
        res.status(200).json(shipments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;