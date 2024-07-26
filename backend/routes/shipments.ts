import express, { Request, Response } from 'express';
import Shipment from '../models/Shipment'; // Importing the model

const router = express.Router();

// Handler functions
// Fetch Shipments
const getAllShipments = async (req: Request, res: Response): Promise<void> => {
    try {
        const shipments = await Shipment.find({});
        res.status(200).json(shipments);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllShipments);

// Export handlers for testing
export {
    router as ShipmentRoutes,
    getAllShipments,
};