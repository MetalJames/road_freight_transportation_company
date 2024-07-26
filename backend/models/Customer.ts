import mongoose, { Document, Schema, model } from 'mongoose';

interface ICustomer extends Document {
    name: string;
    address: string;
    email: string;
    phone: string;
}

const customerSchema: Schema<ICustomer> = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
}, { versionKey: false });

const Customer = model<ICustomer>('Customer', customerSchema);

export default Customer;
