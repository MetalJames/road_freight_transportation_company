import { Request, Response } from 'express';
import { deleteTruck } from '../../routes/trucks';
import Truck from '../../models/Truck';

jest.mock('../../models/Truck'); // Mock the Truck model

describe('Truck Deletion Handler', () => {
    test('deleteTruck should delete a truck', async () => {
        // Mock Truck.findByIdAndDelete to return an object with _id
        (Truck.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: '12345' });

        // Create mock request and response objects
        const req = {
            params: { id: '12345' }
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        
        await deleteTruck(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Truck deleted successfully' });
    });
});