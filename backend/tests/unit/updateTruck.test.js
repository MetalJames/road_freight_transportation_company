const { MongoClient, ObjectId } = require('mongodb');
const { updateTruck } = require('../../yourModule'); // Replace with your module path

describe('Update Truck', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(global.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should update a truck', async () => {
        const truckId = new ObjectId(); // Replace with an actual truck ID
        const updatedTruck = { name: 'Updated Truck', model: '2025' };
        const result = await updateTruck(db, truckId, updatedTruck);
        expect(result.modifiedCount).toBe(1);
    });
});
