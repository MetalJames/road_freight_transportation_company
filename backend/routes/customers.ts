import express, { Request, Response } from 'express';
import Customer from '../models/Customer'; // Importing the model

const router = express.Router();

// Handler functions
// Fetch Customers
const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const customers = await Customer.find({});
        res.status(200).json(customers);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllCustomers);

// Export handlers for testing
export {
    router as CustomerRoutes,
    getAllCustomers,
};