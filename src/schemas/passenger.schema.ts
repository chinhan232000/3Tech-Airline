import { Schema, model } from 'mongoose';
import { IPassenger } from '../interfaces/passenger.interface';

const PassengerSchema = new Schema<IPassenger>({
  address: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  dob: { type: String, required: false },
  phone: { type: String, required: false },
  name: { type: String, required: false },
  password: { type: String },
  username: { type: String, required: false },
});

export const Passenger = model<IPassenger>('Passenger', PassengerSchema);
