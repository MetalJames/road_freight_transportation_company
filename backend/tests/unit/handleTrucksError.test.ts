import { Request, Response } from 'express';
import { getAllTrucks } from '../../routes/trucks';
import Truck from '../../models/Truck';

jest.mock('../../models/Truck'); // Mock the Truck model

describe('Truck Handlers', () => {
    // Negative test case
    test('getAllTrucks should handle errors', async () => {
        // Mock Truck.find to simulate a rejected promise
        (Truck.find as jest.Mock).mockRejectedValue(new Error('Database error'));
        
        // Create mock request and response objects
        const req = {} as Request;

        // Type assertion for `res` as `Partial<Response>` to match the mock type
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        
        await getAllTrucks(req, res);
        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
});