const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}

connectDB();

const db = client.db('road_freight_transportation_company');

// Route for fetching trucks
app.get('/api/trucks', async (req, res) => {
    try {
        const collection = db.collection('trucks'); // Replace with your collection name
        const trucks = await collection.find({}).toArray();
        res.json(trucks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route for creating a new truck
app.post('/api/trucks', async (req, res) => {
    const newTruck = req.body;
    try {
        console.log(`Received request to create new truck: ${JSON.stringify(newTruck)}`);

        // Add the new truck to the collection
        const collection = db.collection('trucks');
        const result = await collection.insertOne(newTruck);

        // Send the newly created truck as the response
        res.status(201).json({ ...newTruck, _id: result.insertedId });
    } catch (err) {
        console.error("Error creating truck:", err);
        res.status(500).send(err.message);
    }
});

// Route for updating a truck
app.put('/api/trucks/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTruck = req.body;
    try {
        console.log(`Received request to update truck with id: ${id}`);
        console.log(`Updated truck data: ${JSON.stringify(updatedTruck)}`);

        // Exclude the _id field from the update object
        delete updatedTruck._id;

        const collection = db.collection('trucks');
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
        console.error("Error updating truck:", err);
        res.status(500).send(err.message);
    }
});

// Route for deleting a truck
app.delete('/api/trucks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Received request to delete truck with id: ${id}`);
        const collection = db.collection('trucks');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount > 0) {
            res.status(200).send("Truck deleted successfully");
        } else {
            res.status(404).send("Truck not found");
        }
    } catch (err) {
        console.error("Error deleting truck:", err);
        res.status(500).send(err.message);
    }
});

// Route for fetching employees
app.get('/api/employees', async (req, res) => {
    try {
        const collection = db.collection('employees'); // Replace with your collection name
        const employees = await collection.find({}).toArray();
        res.json(employees);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route for fetching repair records
app.get('/api/repairRecords', async (req, res) => {
    try {
        const collection = db.collection('repairRecords'); // Replace with your collection name
        const repairRecords = await collection.find({}).toArray();
        res.json(repairRecords);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route for fetching customers
app.get('/api/customers', async (req, res) => {
    try {
        const collection = db.collection('customers'); // Replace with your collection name
        const customers = await collection.find({}).toArray();
        res.json(customers);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route for fetching shipments
app.get('/api/shipments', async (req, res) => {
    try {
        const collection = db.collection('shipments'); // Replace with your collection name
        const shipments = await collection.find({}).toArray();
        res.json(shipments);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route for fetching trips
app.get('/api/trips', async (req, res) => {
    try {
        const collection = db.collection('trips'); // Replace with your collection name
        const trips = await collection.find({}).toArray();
        res.json(trips);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});