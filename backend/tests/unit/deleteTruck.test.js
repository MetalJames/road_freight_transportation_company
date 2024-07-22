const request = require('supertest');
const { MongoClient, ObjectId } = require('mongodb');
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

describe('Delete Truck', () => {
    let truckId;

    // Create a truck before running the delete test
    beforeEach(async () => {
        const result = await db.collection('trucks').insertOne({ name: 'Truck to be deleted', model: '2024' });
        truckId = result.insertedId;
    });

    it('should delete a truck', async () => {
        // Send DELETE request to the API
        const response = await request(app)
            .delete(`/api/trucks/${truckId}`)
            .expect('Content-Type', /json/)
            .expect(200);

        // Check the response
        expect(response.body.message).toBe('Truck deleted successfully');

        // Check if the truck was actually deleted
        const truck = await db.collection('trucks').findOne({ _id: truckId });
        expect(truck).toBeNull();
    });
});