const express = require('express');
const Shipment = require('../models/Shipment');
const router = express.Router();

// Handler functions
// Fetch Shipments
const getAllShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find({});
        res.status(200).json(shipments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllShipments);
// router.post('/', createRepairShipment);
// router.put('/:id', updateRepairShipment);
// router.delete('/:id', deleteRepairShipment);

// Export handlers for testing
module.exports = {
    router,
    getAllShipments,
    // createRepairShipment,
    // updateRepairShipment,
    // deleteRepairShipment
};