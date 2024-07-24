const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const Truck = require('../../models/Truck');

let mongoServer;
let server;

beforeEach(async () => {
    // Start an in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    // Start the server on a different port for testing
    server = app.listen(5002); // Ensure a unique port for testing

    // Insert test data into the in-memory database
    await Truck.create([
        { brand: 'Truck1', load: 1000, capacity: 5000, year: 2022, numberOfRepairs: 0, testFlag: true },
        { brand: 'Truck2', load: 2000, capacity: 6000, year: 2023, numberOfRepairs: 1, testFlag: true }
    ]);
});

afterEach(async () => {
    // Remove only documents with the testFlag
    await Truck.deleteMany({ brand: { $in: ['Truck1', 'Truck2'] } });
    server.close();
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Truck API integration tests', () => {
    it('GET /api/trucks - should fetch all trucks', async () => {
        // Fetch trucks from the API
        const response = await request(app).get('/api/trucks');

        // Fetch the count of existing trucks from the database
        const trucksCount = await Truck.countDocuments({});

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toHaveLength(trucksCount); // Compare length dynamically

        // Check that the response contains trucks with expected properties
        response.body.forEach(truck => {
            expect(truck).toHaveProperty('brand');
            expect(truck).toHaveProperty('load');
            expect(truck).toHaveProperty('capacity');
            expect(truck).toHaveProperty('year');
            expect(truck).toHaveProperty('numberOfRepairs');
        });
    });
});

