import express, { Request, Response } from 'express';
import Truck from '../models/Truck'; // Importing the model

const router = express.Router();

// Handler functions
// Fetch Trucks
const getAllTrucks = async (req: Request, res: Response): Promise<void> => {
    try {
        const trucks = await Truck.find({});
        res.status(200).json(trucks);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Create Truck
const createTruck = async (req: Request, res: Response): Promise<void> => {
    const newTruck = new Truck(req.body);
    try {
        const savedTruck = await newTruck.save();
        res.status(201).json(savedTruck);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Update Truck
const updateTruck = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedTruck = req.body;
    try {
        const truck = await Truck.findByIdAndUpdate(id, updatedTruck, { new: true });
        if (truck) {
            res.status(200).json({ message: 'Truck updated successfully', truck });
        } else {
            res.status(404).json({ message: 'Truck not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Truck
const deleteTruck = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const result = await Truck.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Truck deleted successfully' });
        } else {
            res.status(404).json({ message: 'Truck not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllTrucks);
router.post('/', createTruck);
router.put('/:id', updateTruck);
router.delete('/:id', deleteTruck);

// Export handlers for testing
export {
    router as TruckRoutes,
    getAllTrucks,
    createTruck,
    updateTruck,
    deleteTruck,
};