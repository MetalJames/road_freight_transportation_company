const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

// Route for fetching customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;