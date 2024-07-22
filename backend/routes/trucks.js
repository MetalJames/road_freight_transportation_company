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
        res.json(trucks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route for creating a new truck
router.post('/', async (req, res) => {
    const newTruck = req.body;
    try {
        const collection = req.db.collection('trucks');
        const result = await collection.insertOne(newTruck);
        res.status(201).json({ ...newTruck, _id: result.insertedId });
    } catch (err) {
        res.status(500).send(err.message);
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
            res.status(200).send("Truck updated successfully");
        } else {
            res.status(404).send("Truck not found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route for deleting a truck
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const collection = req.db.collection('trucks');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount > 0) {
            res.status(200).send("Truck deleted successfully");
        } else {
            res.status(404).send("Truck not found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
