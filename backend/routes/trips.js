const express = require('express');
const Trip = require('../models/Trip');
const router = express.Router();

// Route for fetching trips
router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find({});
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;