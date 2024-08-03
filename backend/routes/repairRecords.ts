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

// Create repiar Records
const createRepairRecord = async (req: Request, res: Response): Promise<void> => {
    const newRepairRecord = new RepairRecord(req.body);
    try {
        const savedRepairRecord = await newRepairRecord.save();
        res.status(201).json(savedRepairRecord);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Update Repair Record
const updateRepairRecord = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedRepairRecord = req.body;
    try {
        const repairrecord = await RepairRecord.findByIdAndUpdate(id, updatedRepairRecord, { new: true });
        if (repairrecord) {
            res.status(200).json({ message: 'Repair Records updated successfully', repairrecord });
        } else {
            res.status(404).json({ message: 'Repair Records not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Repair Record
const deleteRepairRecord = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const result = await RepairRecord.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'RepairRecords deleted successfully' });
        } else {
            res.status(404).json({ message: 'RepairRecord not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Routes
router.get('/', getAllRepairRecords);
router.post('/', createRepairRecord);
router.put('/:id', updateRepairRecord);
router.delete('/:id', deleteRepairRecord);

// Export handlers for testing
export {
    router as RepairRecordRoutes,
    getAllRepairRecords,
    createRepairRecord,
    updateRepairRecord,
    deleteRepairRecord,
};