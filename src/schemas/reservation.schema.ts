import { Schema, model } from 'mongoose';
import { IReservation } from '../interfaces/reservation.interface';

const ReservationSchema = new Schema<IReservation>({
  passengerId: { type: Schema.Types.ObjectId, ref: 'Passenger', required: true },
  seatId: { type: Schema.Types.ObjectId, ref: 'Seat', required: true },
});

export const Reservation = model<IReservation>('Reservation', ReservationSchema);
