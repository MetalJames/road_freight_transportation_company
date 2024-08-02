import { Request, Response } from 'express';
import { createTruck } from '../../routes/trucks';
import Truck from '../../models/Truck';

// Define the ValidationError type
interface ValidationError extends Error {
    errors: {
        [key: string]: {
            message: string;
        };
    };
}

jest.mock('../../models/Truck'); // Mock the Truck model

describe('Truck Creation Handler', () => {
    // Happy test case
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
            json: jest.fn(),
        } as unknown as Response;
        
        await createTruck(req, res);
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newTruck);
    });

    // Negative test case: Missing required fields
    test('createTruck should not create a truck with missing fields', async () => {
        const incompleteTruck = { brand: 'New Brand', load: 1500 };

        // Mock a ValidationError with proper structure
        const validationError = new Error('Validation error') as ValidationError;
        validationError.name = 'ValidationError';
        validationError.errors = { brand: { message: 'Path `brand` is required.' } }; 

        // Mock the save method to throw the ValidationError
        (Truck.prototype.save as jest.Mock).mockRejectedValue(validationError);
        
        const req = {
            body: incompleteTruck
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;
        
        await createTruck(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ errors: validationError.errors });
    });

    // Negative test case: Invalid data types
    test('createTruck should not create a truck with invalid data types', async () => {
        const invalidTruck = { brand: 'New Brand', load: 'invalid', capacity: 2500, year: 2025, numberOfRepairs: 1 };

        // Mock a ValidationError with proper structure
        const validationError = new Error('Validation error') as ValidationError;
        validationError.name = 'ValidationError';
        validationError.errors = { brand: { message: 'Path `brand` is required.' } }; 

        // Mock the save method to throw the ValidationError
        (Truck.prototype.save as jest.Mock).mockRejectedValue(validationError);

        const req = {
            body: invalidTruck
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;
        
        await createTruck(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ errors: validationError.errors });
    });

    // Edge case: Extremely high load value
    test('createTruck should handle extremely high load value', async () => {
        const edgeCaseTruck = { brand: 'New Brand', load: 1000000, capacity: 2500, year: 2025, numberOfRepairs: 1 };

        (Truck.prototype.save as jest.Mock).mockResolvedValue(edgeCaseTruck);

        const req = {
            body: edgeCaseTruck
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        
        await createTruck(req, res);
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(edgeCaseTruck);
    });

    // Edge case: Year far in the future
    test('createTruck should handle year far in the future', async () => {
        const edgeCaseTruck = { brand: 'New Brand', load: 1500, capacity: 2500, year: 3000, numberOfRepairs: 1 };

        (Truck.prototype.save as jest.Mock).mockResolvedValue(edgeCaseTruck);

        const req = {
            body: edgeCaseTruck
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        
        await createTruck(req, res);
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(edgeCaseTruck);
    });
});