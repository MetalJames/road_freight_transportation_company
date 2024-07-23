const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const trucksRoutes = require('../../routes/trucks');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Truck = require('../../models/Truck');

let app;
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app = express();
    app.use(express.json());
    app.use('/api/trucks', trucksRoutes);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Update Truck', () => {
    let truckId;

    // Create a truck before running the update test
    beforeEach(async () => {
        const result = await Truck.create({
            brand: 'Truck to be updated',
            load: 10,
            capacity: 20,
            year: 2024,
            numberOfRepairs: 0
        });
        truckId = result._id;
    });

    it('should update a truck', async () => {
        const updatedTruck = {
            brand: 'Updated Truck',
            load: 15,
            capacity: 25,
            year: 2025,
            numberOfRepairs: 1
        };
        
        // Send PUT request to the API
        const response = await request(app)
            .put(`/api/trucks/${truckId}`)
            .send(updatedTruck)
            .expect('Content-Type', /json/)
            .expect(200);

        // Check the response
        expect(response.body.message).toBe('Truck updated successfully');

        // Verify the update in the database
        const truck = await Truck.findById(truckId);
        expect(truck).toEqual(expect.objectContaining(updatedTruck));
    });
});
