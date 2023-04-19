import { Schema, model } from 'mongoose';
import { ISeat } from '../interfaces/seat.interface';

const SeatSchema = new Schema<ISeat>({
  flightId: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
  type: { type: String, required: true },
  position: { type: String, required: true },
  isTaken: { type: Boolean, required: true },
  code: { type: String, required: true },
});

export const Seat = model<ISeat>('Seat', SeatSchema);
