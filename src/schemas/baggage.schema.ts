import { Schema, model } from 'mongoose';
import { IBaggage } from '../interfaces/baggage.interface';

const BaggageSchema = new Schema<IBaggage>({
  weight: { type: Number, required: true },
  flightId: { type: Schema.Types.ObjectId, required: true },
  passengerId: { type: Schema.Types.ObjectId, required: true },
});

export const Baggage = model<IBaggage>('Baggage', BaggageSchema);
