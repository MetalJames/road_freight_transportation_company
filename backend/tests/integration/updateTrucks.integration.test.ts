import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../server';
import Truck from '../../models/Truck';

let mongoServer: MongoMemoryServer;
let server: any;
let updatedTruckId: mongoose.Types.ObjectId | undefined;

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
    server = app.listen(5003); // Ensure a unique port for testing
}, 10000);

afterEach(async () => {
    // Clean up the created truck
    if (updatedTruckId) {
        await Truck.findByIdAndDelete(updatedTruckId);
    }

    server.close();
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Update Truck API tests', () => {
    // Happy path test case
    beforeEach(async () => {
        const result = await Truck.create({
            brand: 'Truck to be updated',
            load: 10,
            capacity: 20,
            year: 2024,
            numberOfRepairs: 0
        });
        updatedTruckId = result._id as mongoose.Types.ObjectId;
    });

    it('PUT /api/trucks/:id - should update a truck', async () => {
        const updatedTruck = {
            brand: 'Updated Truck',
            load: 15,
            capacity: 25,
            year: 2025,
            numberOfRepairs: 1
        };

        // Send PUT request to the API
        const response = await request(server)
            .put(`/api/trucks/${updatedTruckId}`)
            .send(updatedTruck)
            .expect('Content-Type', /json/)
            .expect(200);

        // Check the response
        expect(response.body.message).toBe('Truck updated successfully');

        // Verify the update in the database
        const truck = await Truck.findById(updatedTruckId).lean();
        expect(truck).toEqual(expect.objectContaining(updatedTruck));
    }, 10000);
});