import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../server';
import Employee from '../../models/Employee';

let mongoServer: MongoMemoryServer;
let server: any;

beforeEach(async () => {
    // Start an in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUri);
    }

    // Start the server on a different port for testing
    server = app.listen(5001); // Ensure a unique port for testing

    // Insert sample employee data
    await Employee.insertMany([
        { name: 'John', surname: 'Doe', seniority: 5, type: 'mechanic', category: 'A' },
        { name: 'Jane', surname: 'Smith', seniority: 4, type: 'driver', category: 'B' },
        { name: 'Emily', surname: 'Jones', seniority: 3, type: 'mechanic', category: 'B' },
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
        const response = await request(server).get('/api/employees');

        // Fetch the expected count from the database
        const employeeCount = await Employee.countDocuments({});

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toHaveLength(employeeCount); // Compare length dynamically

        // Check that the response contains employees with expected properties
        response.body.forEach((employee: any) => {
            expect(employee).toHaveProperty('name');
            expect(employee).toHaveProperty('surname');
            expect(employee).toHaveProperty('seniority');
            expect(employee).toHaveProperty('type');
            expect(employee).toHaveProperty('category');
        });
    });
});