import { Document } from 'mongoose';

export interface IAirline extends Document {
  name: string;
  description: string;
  logo: string;
}
