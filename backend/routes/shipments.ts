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

// Create Shipments
const createShipment = async (req: Request, res: Response): Promise<void> => {
    const newShipment = new Shipment(req.body);
    try {
        const savedShipment = await newShipment.save();
        res.status(201).json(savedShipment);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Update Shipment
const updateShipment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedShipment = req.body;
    try {
        const shipment = await Shipment.findByIdAndUpdate(id, updatedShipment, { new: true });
        if (shipment) {
            res.status(200).json({ message: 'Shipment updated successfully', shipment });
        } else {
            res.status(404).json({ message: 'Shipment not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Shipment
const deleteShipment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const result = await Shipment.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Shipment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Shipment not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllShipments);
router.post('/', createShipment);
router.put('/:id', updateShipment);
router.delete('/:id', deleteShipment);

// Export handlers for testing
export {
    router as ShipmentRoutes,
    getAllShipments,
    createShipment,
    updateShipment,
    deleteShipment,
};