const express = require('express');
const Truck = require('../models/Truck');
const router = express.Router();

// Handler functions
// Fetch Trucks
const getAllTrucks = async (req, res) => {
    try {
        const trucks = await Truck.find({});
        res.status(200).json(trucks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create Truck
const createTruck = async (req, res) => {
    const newTruck = new Truck(req.body);
    try {
        const savedTruck = await newTruck.save();
        res.status(201).json(savedTruck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Truck
const updateTruck = async (req, res) => {
    const { id } = req.params;
    const updatedTruck = req.body;
    try {
        const truck = await Truck.findByIdAndUpdate(id, updatedTruck, { new: true });
        if (truck) {
            res.status(200).json({ message: 'Truck updated successfully', truck });
        } else {
            res.status(404).json({ message: 'Truck not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Truck
const deleteTruck = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Truck.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Truck deleted successfully' });
        } else {
            res.status(404).json({ message: 'Truck not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllTrucks);
router.post('/', createTruck);
router.put('/:id', updateTruck);
router.delete('/:id', deleteTruck);

// Export handlers for testing
module.exports = {
    router,
    getAllTrucks,
    createTruck,
    updateTruck,
    deleteTruck
};