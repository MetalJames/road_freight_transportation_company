import mongoose, { Document, Schema, model } from 'mongoose';

interface ITruck extends Document {
  brand: string;
  load: number;
  capacity: number;
  year: number;
  numberOfRepairs: number;
}

const truckSchema: Schema<ITruck> = new Schema({
  brand: { type: String, required: true },
  load: { type: Number, required: true },
  capacity: { type: Number, required: true },
  year: { type: Number, required: true },
  numberOfRepairs: { type: Number, required: true },
}, { versionKey: false });

const Truck = model<ITruck>('Truck', truckSchema);

export default Truck;
