import request from 'supertest';
import mongoose, { Types } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../server';
import Truck from '../../models/Truck';

let mongoServer: MongoMemoryServer;
let server: any;
let createdTruckId: Types.ObjectId | undefined;

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
    server = app.listen(5005); // Ensure a unique port for testing
}, 10000);

afterEach(async () => {
    // Clean up the created truck
    if (createdTruckId) {
        await Truck.findByIdAndDelete(createdTruckId);
    }

    server.close();
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Create Truck API tests', () => {
    // Happy path test case
    it('POST /api/trucks - should create a new truck', async () => {
        const newTruck = {
            brand: 'Truck 1',
            load: 10,
            capacity: 20,
            year: 2025,
            numberOfRepairs: 0
        };

        // Make the POST request to create a new truck
        const response = await request(server)
            .post('/api/trucks')
            .send(newTruck)
            .expect('Content-Type', /json/)
            .expect(201); // Expect a 201 Created status

        // Store the created truck ID
        createdTruckId = response.body._id;

        // Verify the response
        expect(response.body._id).toBeDefined();
        expect(response.body.brand).toBe(newTruck.brand);
        expect(response.body.load).toBe(newTruck.load);
        expect(response.body.capacity).toBe(newTruck.capacity);
        expect(response.body.year).toBe(newTruck.year);
        expect(response.body.numberOfRepairs).toBe(newTruck.numberOfRepairs);

        // Optional: Verify that the truck was actually saved in the database
        const truckInDb = await Truck.findById(createdTruckId).lean(); // Use lean() to get a plain JS object
        expect(truckInDb).toBeDefined();
        expect(truckInDb?.brand).toBe(newTruck.brand);
        expect(truckInDb?.load).toBe(newTruck.load);
        expect(truckInDb?.capacity).toBe(newTruck.capacity);
        expect(truckInDb?.year).toBe(newTruck.year);
        expect(truckInDb?.numberOfRepairs).toBe(newTruck.numberOfRepairs);
    }, 10000);

    // Negative test case
    it('POST /api/trucks - should not create a truck with missing fields', async () => {
        const newTruck = {
            brand: 'Truck 1',
            load: 10
        };

        const response = await request(server)
            .post('/api/trucks')
            .send(newTruck)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body.errors).toBeDefined();
    }, 10000);

    // Negative test case
    it('POST /api/trucks - should not create a truck with invalid data', async () => {
        const newTruck = {
            brand: 'Truck 1',
            load: "invalid",
            capacity: 20,
            year: 2025,
            numberOfRepairs: 0
        };

        const response = await request(server)
            .post('/api/trucks')
            .send(newTruck)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body.errors).toBeDefined();
    }, 10000);

    // Edge test case
    it('POST /api/trucks - should handle very large input values gracefully', async () => {
        const newTruck = {
            brand: 'Truck 1',
            load: Number.MAX_SAFE_INTEGER,
            capacity: Number.MAX_SAFE_INTEGER,
            year: 9999,
            numberOfRepairs: Number.MAX_SAFE_INTEGER
        };

        const response = await request(server)
            .post('/api/trucks')
            .send(newTruck)
            .expect('Content-Type', /json/)
            .expect(201);

        createdTruckId = response.body._id;

        expect(response.body._id).toBeDefined();
        expect(response.body.brand).toBe(newTruck.brand);
        expect(response.body.load).toBe(newTruck.load);
        expect(response.body.capacity).toBe(newTruck.capacity);
        expect(response.body.year).toBe(newTruck.year);
        expect(response.body.numberOfRepairs).toBe(newTruck.numberOfRepairs);

        const truckInDb = await Truck.findById(createdTruckId).lean();
        expect(truckInDb).toBeDefined();
        expect(truckInDb?.brand).toBe(newTruck.brand);
        expect(truckInDb?.load).toBe(newTruck.load);
        expect(truckInDb?.capacity).toBe(newTruck.capacity);
        expect(truckInDb?.year).toBe(newTruck.year);
        expect(truckInDb?.numberOfRepairs).toBe(newTruck.numberOfRepairs);
    }, 10000);
});