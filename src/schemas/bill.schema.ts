import { Schema, model } from 'mongoose';
import { IBill } from '../interfaces/bill.interface';

const BillSchema = new Schema<IBill>({
  passengerId: { type: Schema.Types.ObjectId, required: true },
  paymentId: { type: Schema.Types.ObjectId, required: true },
  total: { type: Number, required: true },
  type: { type: String, required: true },
  reservationId: { type: Schema.Types.ObjectId, required: true },
  baggageId: { type: Schema.Types.ObjectId, required: true },
});

export const Bill = model<IBill>('Bill', BillSchema);
