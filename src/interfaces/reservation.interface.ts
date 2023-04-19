import { Document, Schema } from 'mongoose';

export interface IReservation extends Document {
  passengerId: Schema.Types.ObjectId;
  seatId: Schema.Types.ObjectId;
}
