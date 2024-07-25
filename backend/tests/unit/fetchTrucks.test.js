const { getAllTrucks } = require('../../routes/trucks');
const Truck = require('../../models/Truck');

jest.mock('../../models/Truck'); // Mock the Truck model

describe('Truck Retrieval Handler', () => {
    test('getAllTrucks should return a list of trucks', async () => {
        const trucks = [{ brand: 'Test Brand', load: 1000, capacity: 2000, year: 2024, numberOfRepairs: 0 }];
        Truck.find.mockResolvedValue(trucks);
        
        const req = {};
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
        };
        
        await getAllTrucks(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(trucks);
    });
})