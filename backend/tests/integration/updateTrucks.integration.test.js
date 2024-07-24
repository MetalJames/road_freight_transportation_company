const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const Truck = require('../../models/Truck');

let mongoServer;
let server;
let updatedTruckId;

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
    server = app.listen(5003); // Ensure a unique port for testing
});

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

    beforeEach(async () => {
        const result = await Truck.create({
            brand: 'Truck to be updated',
            load: 10,
            capacity: 20,
            year: 2024,
            numberOfRepairs: 0
        });
        updatedTruckId = result._id;
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
    });
});