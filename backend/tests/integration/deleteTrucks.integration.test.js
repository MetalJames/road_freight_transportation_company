const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const Truck = require('../../models/Truck');

let mongoServer;
let server;
let createdTruckToBeDeletedId;

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
    server = app.listen(5004); // Ensure a unique port for testing
});

afterEach(async () => {
    server.close();
    await mongoose.disconnect();
    await mongoServer.stop();
});


describe('DELETE /api/trucks/:id', () => {

    beforeEach(async () => {
        const result = await Truck.create({
            brand: 'Truck to be deleted',
            load: 10,
            capacity: 20,
            year: 2024,
            numberOfRepairs: 0
        });
        createdTruckToBeDeletedId = result._id;
    });

    it('DELETE /api/trucks/:id - should delete a truck', async () => {
        // Send DELETE request to the API
        const res = await request(server)
            .delete(`/api/trucks/${createdTruckToBeDeletedId}`)
            .expect('Content-Type', /json/)
            .expect(200);

        // Check the response
        expect(res.body.message).toBe('Truck deleted successfully');

        // Verify the truck is no longer in the database
        const deletedTruck = await Truck.findById(createdTruckToBeDeletedId);
        expect(deletedTruck).toBeNull();
    });
});
