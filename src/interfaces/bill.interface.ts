import { Document, Schema } from 'mongoose';

export interface IBill extends Document {
  passengerId: Schema.Types.ObjectId;
  paymentId: Schema.Types.ObjectId;
  total: number;
  type: string;
  reservationId: Schema.Types.ObjectId;
  baggageId: Schema.Types.ObjectId;
}
