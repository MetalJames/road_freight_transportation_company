const express = require('express');
const Truck = require('../models/Truck'); // Adjust the path as needed
const router = express.Router();

// Route for fetching trucks
router.get('/', async (req, res) => {
    try {
        const trucks = await Truck.find({});
        res.status(200).json(trucks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route for creating a new truck
router.post('/', async (req, res) => {
    const newTruck = new Truck(req.body);
    try {
        const savedTruck = await newTruck.save();
        res.status(201).json(savedTruck);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route for updating a truck
router.put('/:id', async (req, res) => {
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
});

// Route for deleting a truck
router.delete('/:id', async (req, res) => {
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
});

module.exports = router;
