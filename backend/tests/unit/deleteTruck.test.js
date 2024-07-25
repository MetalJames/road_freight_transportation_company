const { deleteTruck } = require('../../routes/trucks');
const Truck = require('../../models/Truck');

jest.mock('../../models/Truck'); // Mock the Truck model

describe('Truck Deletion Handler', () => {
    test('deleteTruck should delete a truck', async () => {
        Truck.findByIdAndDelete.mockResolvedValue({ _id: '12345' });
        
        const req = { params: { id: '12345' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        await deleteTruck(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Truck deleted successfully' });
    });
});