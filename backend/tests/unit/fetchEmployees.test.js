const request = require('supertest');
const { MongoClient } = require('mongodb');
const express = require('express');
const employeesRoutes = require('../../routes/employees'); // Adjust path as needed
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
    app.use('/api/employees', employeesRoutes);
    app.set('db', db);
});

afterAll(async () => {
    await mongoServer.stop();
});

describe('Employees API', () => {
    it('should fetch all employees', async () => {
        const collection = db.collection('employees');
        await collection.insertMany([{ name: 'Employee 1' }, { name: 'Employee 2' }]);

        const response = await request(app).get('/api/employees');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(2);
    });
});
