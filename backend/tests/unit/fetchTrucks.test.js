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

describe('Trucks API', () => {
    it('should fetch all trucks', async () => {
        const collection = mongoose.connection.collection('trucks');
        await collection.insertMany([{ brand: 'Truck 1', load: 10, capacity: 20, year: 2020, numberOfRepairs: 1 }, { brand: 'Truck 2', load: 15, capacity: 25, year: 2021, numberOfRepairs: 2 }]);

        const response = await request(app).get('/api/trucks');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(2);
    });
});
