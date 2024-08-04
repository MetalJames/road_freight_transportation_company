import mongoose, { Document, Schema, model } from 'mongoose';

interface ITrip extends Document {
    id: number;
    route_from: string;
    route_to: string;
    drivers: string[];
    shipments: string[];
}

const tripSchema: Schema<ITrip> = new Schema({
    id: { type: Number, required: true },
    route_from: { type: String, required: true },
    route_to: { type: String, required: true },
    drivers: { type: [String], required: true },
    shipments: { type: [String], required: true },
}, { versionKey: false });

const Trip = model<ITrip>('Trip', tripSchema);

export default Trip;