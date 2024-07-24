const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const request = require('supertest');
const trucksRoutes = require('../../routes/trucks');

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

describe('Create Truck API', () => {
    it('should create a new truck', async () => {
        const newTruck = {
            brand: 'Truck 1',
            load: 10,
            capacity: 20,
            year: 2025,
            numberOfRepairs: 0
        };

        try {
            const response = await request(app)
                .post('/api/trucks')
                .send(newTruck)
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body._id).toBeDefined();
            expect(response.body.brand).toBe(newTruck.brand);
            expect(response.body.load).toBe(newTruck.load);
            expect(response.body.capacity).toBe(newTruck.capacity);
            expect(response.body.year).toBe(newTruck.year);
            expect(response.body.numberOfRepairs).toBe(newTruck.numberOfRepairs);
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
