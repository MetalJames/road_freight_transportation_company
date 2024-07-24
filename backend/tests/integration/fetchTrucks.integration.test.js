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

    // Clear the truck collection
    await Truck.deleteMany({});

    // Insert sample data
    await Truck.insertMany([
        { brand: 'Ford', load: 1000, capacity: 5000, year: 2022, numberOfRepairs: 2 },
        { brand: 'Volvo', load: 2000, capacity: 6000, year: 2021, numberOfRepairs: 5 },
        { brand: 'Mercedes', load: 1500, capacity: 5500, year: 2023, numberOfRepairs: 1 }
    ]);

    // Start the server on a different port for testing
    server = app.listen(5002); // Ensure a unique port for testing
});

afterEach(async () => {
    server.close();
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Truck API integration tests', () => {
    it('GET /api/trucks - should fetch all trucks', async () => {
        const response = await request(app).get('/api/trucks');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBeTruthy();

        // Check that the response contains trucks with expected properties
        response.body.forEach(truck => {
            expect(truck).toHaveProperty('brand');
            expect(truck).toHaveProperty('load');
            expect(truck).toHaveProperty('capacity');
            expect(truck).toHaveProperty('year');
            expect(truck).toHaveProperty('numberOfRepairs');
        });

        // expect(response.body).toHaveLength(3); // Ensure only 3 trucks are present
        // expect(response.body[0]).toHaveProperty('brand');
        // expect(response.body[0]).toHaveProperty('load');
        // expect(response.body[0]).toHaveProperty('capacity');
        // expect(response.body[0]).toHaveProperty('year');
        // expect(response.body[0]).toHaveProperty('numberOfRepairs');
    });
});
