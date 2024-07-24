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

    // Start the server on a different port for testing
    server = app.listen(5001); // Ensure a unique port for testing

    // Insert sample employee data
    await Employee.insertMany([
        { name: 'John', surname: 'Doe', seniority: 5, type: 'mechanic', category: 'A', testFlag: true },
        { name: 'Jane', surname: 'Smith', seniority: 4, type: 'driver', category: 'B', testFlag: true },
        { name: 'Emily', surname: 'Jones', seniority: 3, type: 'mechanic', category: 'B', testFlag: true },
    ]);
});

afterEach(async () => {
    // Remove only documents with the testFlag
    await Employee.deleteMany({ name: { $in: ['John', 'Jane', 'Emily'] } });
    server.close();
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Employee API integration tests', () => {
    it('GET /api/employees - should fetch all employees', async () => {
        // Fetch the employees from the API
        const response = await request(app).get('/api/employees');

        // Fetch the expected count from the database
        const employeeCount = await Employee.countDocuments({});

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toHaveLength(employeeCount); // Compare length dynamically

        // Check that the response contains trucks with expected properties
        response.body.forEach(employee => {
            expect(employee).toHaveProperty('name');
            expect(employee).toHaveProperty('surname');
            expect(employee).toHaveProperty('seniority');
            expect(employee).toHaveProperty('type');
            expect(employee).toHaveProperty('category');
        });
    });
});