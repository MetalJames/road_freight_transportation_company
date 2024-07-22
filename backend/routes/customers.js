const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Middleware to inject the database connection
const dbMiddleware = (req, res, next) => {
    req.db = req.app.get('db');
    next();
};

router.use(dbMiddleware);

// Route for fetching customers
router.get('/', async (req, res) => {
    try {
        const collection = req.db.collection('customers'); // Replace with your collection name
        const customers = await collection.find({}).toArray();
        res.json(customers);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;