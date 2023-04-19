import { Document, Schema } from 'mongoose';

export interface ISeat extends Document {
  flightId: Schema.Types.ObjectId;
  type: string;
  position: string;
  code: string;
  isTaken: boolean;
}
