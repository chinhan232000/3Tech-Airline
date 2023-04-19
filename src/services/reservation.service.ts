/**
 * @module reservationService
 * @description This module provides functions for interacting with the Reservation collection in the database.
 * @author Nhan Vo
 * @date 17 April 2023
 */
import { IReservation } from '../interfaces/reservation.interface';
import { Reservation } from '../schemas/reservation.schema';

/**

Get all reservations of a passenger by passenger id
@param {string} userId - ID of the passenger
@returns {Promise<IReservation[]>} - List of all reservations of the passenger
*/
export const getAll = async (userId: string): Promise<IReservation[]> => {
  const reservations = await Reservation.find({
    passengerId: userId,
  })
    .populate({
      path: 'seatId',
      populate: {
        path: 'flightId',
        populate: {
          path: 'airlineId',
        },
      },
    })
    .sort({ createdAt: -1 });

  return reservations;
};

/**

Get a reservation by reservation id
@param {string} id - ID of the reservation
@returns {Promise<IReservation>} - The reservation object
*/
export const getById = async (id: string): Promise<IReservation> => {
  const reservation = await Reservation.findById(id).populate({
    path: 'seatId',
    populate: {
      path: 'flightId',
      populate: {
        path: 'airlineId',
      },
    },
  });

  return reservation as IReservation;
};

/**

Create a new reservation for a passenger
@param {IReservation} reservation - The reservation object to be created
@param {string} userId - ID of the passenger
@returns {Promise<IReservation>} - The created reservation object
*/
export const create = async (reservation: IReservation, userId: string): Promise<IReservation> => {
  const newReservation = new Reservation({
    passengerId: userId,
    seatId: reservation.seatId,
  });

  return newReservation.save();
};

/**

Update an existing reservation by reservation id
@param {string} id - ID of the reservation to be updated
@param {IReservation} reservation - The reservation object containing new data
@returns {Promise<IReservation>} - The updated reservation object
@throws {Error} - If reservation with the given id is not found
*/
export const updateById = async (id: string, reservation: IReservation): Promise<IReservation> => {
  const isExistReservation = await Reservation.findById(id).lean();
  if (!isExistReservation) {
    throw new Error('Reservation not found');
  }

  const reservationUpdate = await Reservation.findByIdAndUpdate(id, reservation, { new: true });

  return reservationUpdate as IReservation;
};

/**

Delete a reservation by reservation id
@param {string} id - ID of the reservation to be deleted
@returns {Promise<IReservation>} - The deleted reservation object
*/
export const deleteById = async (id: string): Promise<IReservation> => {
  const reservation = await Reservation.findByIdAndDelete(id);
  return reservation as IReservation;
};
