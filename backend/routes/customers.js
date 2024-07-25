const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

// Handler functions
// Fetch Customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllCustomers);
// router.post('/', createCustomer);
// router.put('/:id', updateCustomer);
// router.delete('/:id', deleteCustomer);

// Export handlers for testing
module.exports = {
    router,
    getAllCustomers,
    // createCustomer,
    // updateCustomer,
    // deleteCustomer
};