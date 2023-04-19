import { Document, Schema } from 'mongoose';

export interface IFlight extends Document {
  code: string;
  arrivalDate: Date;
  departureDate: Date;
  airlineId: Schema.Types.ObjectId;
  from: Schema.Types.ObjectId;
  to: Schema.Types.ObjectId;
  price: number;
}
