import express, { Request, Response } from 'express';
import RepairRecord from '../models/RepairRecord'; // Importing the model

const router = express.Router();

// Handler functions
// Fetch Repair Records
const getAllRepairRecords = async (req: Request, res: Response): Promise<void> => {
    try {
        const repairRecords = await RepairRecord.find({});
        res.status(200).json(repairRecords);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllRepairRecords);

// Export handlers for testing
export {
    router as RepairRecordRoutes,
    getAllRepairRecords,
};