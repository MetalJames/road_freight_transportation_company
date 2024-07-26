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

// Routes
router.get('/', getAllTrips);

// Export handlers for testing
export {
    router as TripRoutes,
    getAllTrips,
};