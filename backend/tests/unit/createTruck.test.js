const request = require('supertest');
const { MongoClient } = require('mongodb');
const express = require('express');
const trucksRoutes = require('../../routes/trucks'); // Adjust path as needed
const { MongoMemoryServer } = require('mongodb-memory-server');

let app;
let mongoServer;
let db;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('test');
    
    app = express();
    app.use(express.json());
    app.use('/api/trucks', trucksRoutes);
    app.set('db', db);
});

afterAll(async () => {
    await mongoServer.stop();
});

describe('Create Truck', () => {
    it('should create a new truck', async () => {
        const newTruck = { name: 'Test Truck', model: '2024' };

        const response = await request(app)
            .post('/api/trucks')
            .send(newTruck)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body._id).toBeDefined();
        expect(response.body.name).toBe(newTruck.name);
        expect(response.body.model).toBe(newTruck.model);
    });
});