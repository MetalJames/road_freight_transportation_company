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

describe('Trucks API', () => {
    it('should fetch all trucks', async () => {
        const collection = db.collection('trucks');
        await collection.insertMany([{ name: 'Truck 1' }, { name: 'Truck 2' }]);

        const response = await request(app).get('/api/trucks');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(2);
    });
});
