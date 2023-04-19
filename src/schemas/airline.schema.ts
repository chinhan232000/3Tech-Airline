import { Schema, model } from 'mongoose';
import { IAirline } from '../interfaces/airline.interface';

const AirlineSchema = new Schema<IAirline>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

export const Airline = model<IAirline>('Airline', AirlineSchema);
