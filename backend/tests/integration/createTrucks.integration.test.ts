import request from 'supertest';
import mongoose, { Types } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../server';
import Truck from '../../models/Truck';

let mongoServer: MongoMemoryServer;
let server: any;
let createdTruckId: Types.ObjectId | undefined;

beforeEach(async () => {
    // Start an in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUri);
    }

    // Start the server on a different port for testing
    server = app.listen(5005); // Ensure a unique port for testing
});

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
    });
});
