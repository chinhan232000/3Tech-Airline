import { Schema, model } from 'mongoose';
import { IFlight } from '../interfaces/flight.interface';

const FlightSchema = new Schema<IFlight>({
  code: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  airlineId: {
    type: Schema.Types.ObjectId,
    ref: 'Airline',
    required: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'Airport',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Airport',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Flight = model<IFlight>('Flight', FlightSchema);
