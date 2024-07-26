import mongoose, { Document, Schema, model } from 'mongoose';

interface ITrip extends Document {
    truckId: mongoose.Types.ObjectId;
    driverId: mongoose.Types.ObjectId;
    startLocation: string;
    endLocation: string;
    startDate: Date;
    endDate: Date;
    distance: number;
}

const tripSchema: Schema<ITrip> = new Schema({
    truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    distance: { type: Number, required: true },
}, { versionKey: false });

const Trip = model<ITrip>('Trip', tripSchema);

export default Trip;