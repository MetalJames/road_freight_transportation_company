import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 800;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || '';
mongoose.connect(uri)
    .then(() => {
        if (process.env.NODE_ENV !== 'test') {
        console.log('Connected to MongoDB!');
        }
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Import and use routes
import { TruckRoutes } from './routes/trucks';
app.use('/api/trucks', TruckRoutes);

import { EmployeeRoutes } from './routes/employees';
app.use('/api/employees', EmployeeRoutes);

import { RepairRecordRoutes } from './routes/repairRecords';
app.use('/api/repairRecords', RepairRecordRoutes);

import { CustomerRoutes } from './routes/customers';
app.use('/api/customers', CustomerRoutes);

import { ShipmentRoutes } from './routes/shipments';
app.use('/api/shipments', ShipmentRoutes);

import { TripRoutes } from './routes/trips';
app.use('/api/trips', TripRoutes);

// Cron job route
app.get('/cron-job', (req: Request, res: Response) => {
    // Perform cron job tasks
    // Return minimal output
    res.send('OK'); // Or any minimal status message
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

export default app;
