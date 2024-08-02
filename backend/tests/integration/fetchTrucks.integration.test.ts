import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../server';
import Truck from '../../models/Truck';

let mongoServer: MongoMemoryServer;
let server: any;

// Increase the timeout for the overall setup
jest.setTimeout(20000);

beforeEach(async () => {
    // Start an in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUri);
    }

    // Start the server on a different port for testing
    server = app.listen(5002); // Ensure a unique port for testing

    // Insert test data into the in-memory database
    await Truck.create([
        { brand: 'Truck1', load: 1000, capacity: 5000, year: 2022, numberOfRepairs: 0 },
        { brand: 'Truck2', load: 2000, capacity: 6000, year: 2023, numberOfRepairs: 1 }
    ]);
}, 10000);

afterEach(async () => {
    // Remove only specific test data
    await Truck.deleteMany({ brand: { $in: ['Truck1', 'Truck2'] } });
    server.close();
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Truck API integration tests', () => {
    // Happy path test case
    it('GET /api/trucks - should fetch all trucks', async () => {
        // Fetch trucks from the API
        const response = await request(server).get('/api/trucks');

        // Fetch the count of existing trucks from the database
        const trucksCount = await Truck.countDocuments({});

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toHaveLength(trucksCount); // Compare length dynamically

        // Check that the response contains trucks with expected properties
        response.body.forEach((truck: any) => {
            expect(truck).toHaveProperty('brand');
            expect(truck).toHaveProperty('load');
            expect(truck).toHaveProperty('capacity');
            expect(truck).toHaveProperty('year');
            expect(truck).toHaveProperty('numberOfRepairs');
        });
    }, 10000);
});