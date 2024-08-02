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

// Create Customer
const createCustomer = async (req: Request, res: Response): Promise<void> => {
    const newCustomer = new Customer(req.body);
    try {
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Update Customer
const updateCustomer = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedCustomer = req.body;
    try {
        const customer = await Customer.findByIdAndUpdate(id, updatedCustomer, { new: true });
        if (customer) {
            res.status(200).json({ message: 'Customer updated successfully', customer });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Customer
const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const result = await Customer.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Customer deleted successfully' });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllCustomers);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

// Export handlers for testing
export {
    router as CustomerRoutes,
    getAllCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};

