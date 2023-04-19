import { Schema, model } from 'mongoose';
import { IAirport } from '../interfaces/airport.interface';

const AirportSchema = new Schema<IAirport>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  code: { type: String, required: true },
});

export const Airport = model<IAirport>('Airport', AirportSchema);
