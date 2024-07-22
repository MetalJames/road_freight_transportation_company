const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 800;

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
        app.set('db', client.db('road_freight_transportation_company'));
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}

connectDB();

//trucks
const truckRoutes = require('./routes/trucks');
app.use('/api/trucks', truckRoutes);

//employees
const employeesRoutes = require('./routes/employees');
app.use('/api/employees', employeesRoutes);

//repair records
const repairRecordsRoutes = require('./routes/repairRecords');
app.use('/api/repairRecords', repairRecordsRoutes);

//customers
const customersRoutes = require('./routes/customers');
app.use('/api/customers', customersRoutes);

//shipments
const shipmentsRoutes = require('./routes/shipments');
app.use('/api/shipments', shipmentsRoutes);

//trips
const tripsRoutes = require('./routes/trips');
app.use('/api/trips', tripsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
