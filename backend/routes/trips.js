const express = require('express');
const Trip = require('../models/Trip');
const router = express.Router();

// Handler functions
// Fetch Trips
const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find({});
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllTrips);
// router.post('/', createTrip);
// router.put('/:id', updateTrip);
// router.delete('/:id', deleteTrip);

// Export handlers for testing
module.exports = {
    router,
    getAllTrips,
    // createTrip,
    // updateTrip,
    // deleteTrip
};