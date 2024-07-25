const { createTruck} = require('../../routes/trucks');
const Truck = require('../../models/Truck');

jest.mock('../../models/Truck'); // Mock the Truck model

describe('Truck Creation Handler', () => {
    test('createTruck should create a new truck', async () => {
        const newTruck = { brand: 'New Brand', load: 1500, capacity: 2500, year: 2025, numberOfRepairs: 1 };
        Truck.prototype.save = jest.fn().mockResolvedValue(newTruck);
        
        const req = { body: newTruck };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        await createTruck(req, res);
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newTruck);
    });
});