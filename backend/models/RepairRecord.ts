import mongoose, { Document, Schema, model } from 'mongoose';

interface IRepairRecord extends Document {
    id: number;
    mechanic: string;
    estimatedRepairTime: number;
    truck: string;
}

const repairRecordSchema: Schema<IRepairRecord> = new Schema({
    id: { type: Number, required: true },
    mechanic: { type: String, required: true },
    estimatedRepairTime: { type: Number, required: true },
    truck: { type: String, required: true },
}, { collection: 'repairRecords' });

const RepairRecord = model<IRepairRecord>('RepairRecord', repairRecordSchema);

export default RepairRecord;
