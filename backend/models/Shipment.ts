import mongoose, { Document, Schema, model } from 'mongoose';

interface IShipment extends Document {
    truckId: mongoose.Types.ObjectId;
    customerId: mongoose.Types.ObjectId;
    load: number;
    destination: string;
    shipmentDate: Date;
    deliveryDate: Date;
}

const shipmentSchema: Schema<IShipment> = new Schema({
    truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    load: { type: Number, required: true },
    destination: { type: String, required: true },
    shipmentDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
}, { versionKey: false });

const Shipment = model<IShipment>('Shipment', shipmentSchema);

export default Shipment;
