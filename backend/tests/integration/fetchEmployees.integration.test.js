const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const Employee = require('../../models/Employee');

let mongoServer;
let server;

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

    // Clear the employee collection
    await Employee.deleteMany({});

    // Insert sample data
    await Employee.insertMany([
        { id: 11, name: "James", surname: "Black", seniority: 13, type: "mechanic", category: "A" },
        { id: 12, name: "Lars", surname: "Ulrich", seniority: 5, type: "driver", category: "A" },
        { id: 13, name: "Not", surname: "Sure", seniority: 3, type: "driver", category: "D" },
    ]);

    // Start the server on a different port for testing
    server = app.listen(5001); // Ensure a unique port for testing
});

afterEach(async () => {
    server.close();
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Employee API integration tests', () => {
    it('GET /api/employees - should fetch all employees', async () => {
        const response = await request(app).get('/api/employees');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toHaveLength(3); // Ensure only 3 employee are present
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('surname');
        expect(response.body[0]).toHaveProperty('seniority');
        expect(response.body[0]).toHaveProperty('type');
        expect(response.body[0]).toHaveProperty('category');
    });
});