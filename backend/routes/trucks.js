const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Middleware to inject the database connection
const dbMiddleware = (req, res, next) => {
    req.db = req.app.get('db');
    next();
};

router.use(dbMiddleware);

// Route for fetching trucks
router.get('/', async (req, res) => {
    try {
        const collection = req.db.collection('trucks');
        const trucks = await collection.find({}).toArray();
        res.status(200).json(trucks); // Ensure JSON response with a 200 status code
    } catch (err) {
        res.status(500).json({ message: err.message }); // Return error as JSON
    }
});

// Route for creating a new truck
router.post('/', async (req, res) => {
    const newTruck = req.body;
    try {
        const collection = req.db.collection('trucks');
        const result = await collection.insertOne(newTruck);
        res.status(201).json({ ...newTruck, _id: result.insertedId }); // Return created truck with 201 status code
    } catch (err) {
        res.status(500).json({ message: err.message }); // Return error as JSON
    }
});

// Route for updating a truck
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTruck = req.body;
    try {
        delete updatedTruck._id;
        const collection = req.db.collection('trucks');
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedTruck }
        );
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Truck updated successfully' });
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
        const collection = req.db.collection('trucks');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Truck deleted successfully' });
        } else {
            res.status(404).json({ message: 'Truck not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
