import mongoose, { Document, Schema, model } from 'mongoose';

interface IEmployee extends Document {
    name: string;
    surname: string;
    seniority: number;
    type: string;
    category: string;
    specializedBrand?: string;
}

const employeeSchema: Schema<IEmployee> = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    seniority: { type: Number, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    specializedBrand: { type: String, required: false },
}, { versionKey: false });

const Employee = model<IEmployee>('Employee', employeeSchema);

export default Employee;
