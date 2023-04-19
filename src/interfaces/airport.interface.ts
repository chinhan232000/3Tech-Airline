import { Document } from 'mongoose';

export interface IAirport extends Document {
  name: string;
  code: string;
  location: string;
}
