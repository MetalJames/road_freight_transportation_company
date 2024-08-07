import mongoose, { Document, Schema, model } from 'mongoose';

interface ICustomer extends Document {
    name: string;
    surname: string;
    address: string;
    phone: string[];
}

const customerSchema: Schema<ICustomer> = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: [String], required: true },
}, { versionKey: false });

const Customer = model<ICustomer>('Customer', customerSchema);

export default Customer;
