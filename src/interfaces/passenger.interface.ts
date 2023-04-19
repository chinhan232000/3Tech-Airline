import { Document } from 'mongoose';

export interface IPassenger extends Document {
  name: string;
  phone: string;
  email: string;
  dob: string;
  address: string;
  username: string;
  password: string;
}
