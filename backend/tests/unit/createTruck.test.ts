import { Request, Response } from 'express';
import { createTruck } from '../../routes/trucks';
import Truck from '../../models/Truck';

jest.mock('../../models/Truck'); // Mock the Truck model

describe('Truck Creation Handler', () => {
    test('createTruck should create a new truck', async () => {
        const newTruck = { brand: 'New Brand', load: 1500, capacity: 2500, year: 2025, numberOfRepairs: 1 };
        
        // Mock Truck.prototype.save to return the new truck
        (Truck.prototype.save as jest.Mock).mockResolvedValue(newTruck);
        
        // Create mock request and response objects
        const req = {
            body: newTruck
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        
        await createTruck(req, res);
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newTruck);
    });
});