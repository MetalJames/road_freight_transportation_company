import { Request, Response } from 'express';
import { getAllTrucks } from '../../routes/trucks';
import Truck from '../../models/Truck';

jest.mock('../../models/Truck'); // Mock the Truck model

describe('Truck Retrieval Handler', () => {
    // Happy path test case
    test('getAllTrucks should return a list of trucks', async () => {
        const trucks = [{ brand: 'Test Brand', load: 1000, capacity: 2000, year: 2024, numberOfRepairs: 0 }];
        
        // Mock Truck.find to return the trucks array
        (Truck.find as jest.Mock).mockResolvedValue(trucks);
        
        // Create mock request and response objects
        const req = {} as Request;

        // Type assertion for `res` as `Partial<Response>` to match the mock type
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        
        await getAllTrucks(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(trucks);
    });
});