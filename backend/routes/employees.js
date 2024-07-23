const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// Route for fetching employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route for creating a new employee
router.post('/', async (req, res) => {
    const newEmployee = new Employee(req.body);
    try {
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route for updating a truck
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedEmployee = req.body;
    try {
        const employee = await Employee.findByIdAndUpdate(id, updatedEmployee, { new: true });
        if (employee) {
            res.status(200).json({ message: 'Employee updated successfully', employee });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route for deleting a truck
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Employee.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;