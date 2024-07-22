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

describe('Update Truck', () => {
    let truckId;

    // Create a truck before running the delete test
    beforeEach(async () => {
        const result = await db.collection('trucks').insertOne({ name: 'Truck to be deleted', model: '2024' });
        truckId = result.insertedId;
    });


    it('should update a truck', async () => {
        const updatedTruck = { name: 'Updated Truck', model: '2025' };
        
        // Send PUT request to the API
        const response = await request(app)
            .put(`/api/trucks/${truckId}`)
            .send(updatedTruck)
            .expect('Content-Type', /json/)
            .expect(200);

        // Check the response
        expect(response.body.message).toBe('Truck updated successfully');

        // Verify the update in the database
        const truck = await db.collection('trucks').findOne({ _id: truckId });
        expect(truck).toEqual(expect.objectContaining(updatedTruck));
    });
});
