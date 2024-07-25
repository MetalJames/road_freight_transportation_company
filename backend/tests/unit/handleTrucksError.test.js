const { getAllTrucks } = require('../../routes/trucks');
const Truck = require('../../models/Truck');

jest.mock('../../models/Truck'); // Mock the Truck model

describe('Truck Handlers', () => {
    test('getAllTrucks should handle errors', async () => {
        Truck.find.mockRejectedValue(new Error('Database error'));
        
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        await getAllTrucks(req, res);
        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
});