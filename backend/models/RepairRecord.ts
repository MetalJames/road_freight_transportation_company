import mongoose, { Document, Schema, model } from 'mongoose';

interface IRepairRecord extends Document {
    recordId: string;
    mechanic: string;
    estimatedRepairTime: string;
    truck: string;
}

const repairRecordSchema: Schema<IRepairRecord> = new Schema({
    recordId: { type: String, required: true },
    mechanic: { type: String, required: true },
    estimatedRepairTime: { type: String, required: true },
    truck: { type: String, required: true },
}, { collection: 'repairRecords', versionKey: false }, );

const RepairRecord = model<IRepairRecord>('RepairRecord', repairRecordSchema);

export default RepairRecord;
