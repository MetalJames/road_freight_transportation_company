import express, { Request, Response } from 'express';
import Trip from '../models/Trip'; // Importing the model

const router = express.Router();

// Handler functions
// Fetch Trips
const getAllTrips = async (req: Request, res: Response): Promise<void> => {
    try {
        const trips = await Trip.find({});
        res.status(200).json(trips);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Create Trip
const createTrip = async (req: Request, res: Response): Promise<void> => {
    const newTrip = new Trip(req.body);
    try {
        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Update Trip
const updateTrip = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedTrip = req.body;
    try {
        const trip = await Trip.findByIdAndUpdate(id, updatedTrip, { new: true });
        if (trip) {
            res.status(200).json({ message: 'Trip updated successfully', trip });
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Trip
const deleteTrip = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const result = await Trip.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Trip deleted successfully' });
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllTrips);
router.post('/', createTrip);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

// Export handlers for testing
export {
    router as TripRoutes,
    getAllTrips,
    createTrip,
    updateTrip,
    deleteTrip,
};