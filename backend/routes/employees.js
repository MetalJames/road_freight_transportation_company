const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Middleware to inject the database connection
const dbMiddleware = (req, res, next) => {
    req.db = req.app.get('db');
    next();
};

router.use(dbMiddleware);

// Route for fetching employees
router.get('/', async (req, res) => {
    try {
        const collection = req.db.collection('employees'); // Replace with your collection name
        const employees = await collection.find({}).toArray();
        res.json(employees);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;