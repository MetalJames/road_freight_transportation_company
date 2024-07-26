import express, { Request, Response } from 'express';
import Employee from '../models/Employee'; // Importing the model

const router = express.Router();

// Handler functions
// Fetch Employees
const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Create Employee
const createEmployee = async (req: Request, res: Response): Promise<void> => {
    const newEmployee = new Employee(req.body);
    try {
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Update Employee
const updateEmployee = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedEmployee = req.body;
    try {
        const employee = await Employee.findByIdAndUpdate(id, updatedEmployee, { new: true });
        if (employee) {
            res.status(200).json({ message: 'Employee updated successfully', employee });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Employee
const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const result = await Employee.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllEmployees);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

// Export handlers for testing
export {
    router as EmployeeRoutes,
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};