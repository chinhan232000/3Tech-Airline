import { Document, Schema } from 'mongoose';

export interface IBaggage extends Document {
  flightId: Schema.Types.ObjectId;
  passengerId: Schema.Types.ObjectId;
  weight: number;
}
