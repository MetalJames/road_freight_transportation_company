import mongoose, { Document, Schema, model } from 'mongoose';

interface IShipment extends Document {
    shipmentId: string;
    driverName: string;
    customerName: string;
    load: number;
    destination: string;
    pickUpLocation: string;
    value: number;
    shipmentDate: Date;
    shouldBeDeliveredBefore: Date;
}

const shipmentSchema: Schema<IShipment> = new Schema({
    driverName: { type: String, required: true },
    customerName: { type: String, required: true },
    load: { type: Number, required: true },
    destination: { type: String, required: true },
    pickUpLocation: { type: String, required: true },
    value: { type: Number, required: true },
    shipmentDate: { type: Date, required: true },
    shouldBeDeliveredBefore: { type: Date, required: true },
}, { versionKey: false });

const Shipment = model<IShipment>('Shipment', shipmentSchema);

export default Shipment;