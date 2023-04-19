/**
 * @module seatService
 * @description This module provides functions for interacting with the Seat collection in the database,
 * including creating, retrieving, updating, and deleting seats for a particular flight.
 * @author Nhan Vo
 * @date 18 April 2023
 */
import { ISeat } from '../interfaces/seat.interface';
import { Seat } from '../schemas/seat.schema';

/**

Get all seats of a specific flight
@async
@function
@param {string} flightId - The ID of the flight
@returns {Promise<ISeat[]>} The list of seats of the specified flight
*/
export const getAll = async (flightId: string): Promise<ISeat[]> => {
  const seats = await Seat.find({
    flightId,
  });

  return seats;
};

/**

Get a seat by its ID
@async
@function
@param {string} id - The ID of the seat
@returns {Promise<ISeat>} The seat with the specified ID
*/
export const getById = async (id: string): Promise<ISeat> => {
  const seat = await Seat.findById(id);
  return seat as ISeat;
};

/**

Create a new seat
@async
@function
@param {ISeat} seat - The seat object
@returns {Promise<ISeat>} The created seat object
*/
export const create = async (seat: ISeat): Promise<ISeat> => {
  const newSeat = new Seat(seat);
  return newSeat.save();
};

/**

Create all seats for a flight
@async
@function
@param {string} flightId - The ID of the flight
@returns {Promise<void>}
*/
export const createFullSeat = async (flightId: string) => {
  const seatList = createSeatList(flightId);
  return Seat.insertMany(seatList);
};

/**

Update a seat by its ID
@async
@function
@param {string} id - The ID of the seat
@param {Partial<ISeat>} seat - The seat object
@returns {Promise<ISeat>} The updated seat object
@throws {Error} Throws an error if the seat is not found
*/
export const updateById = async (id: string, seat: Partial<ISeat>): Promise<ISeat> => {
  const isExistSeat = await Seat.findById(id).lean();
  if (!isExistSeat) {
    throw new Error('Seat not found');
  }

  const seatUpdate = await Seat.findByIdAndUpdate(id, seat, { new: true });

  return seatUpdate as ISeat;
};

/**

Delete a seat by its ID
@async
@function
@param {string} id - The ID of the seat
@returns {Promise<ISeat>} The deleted seat object
*/
export const deleteById = async (id: string): Promise<ISeat> => {
  const seat = await Seat.findByIdAndDelete(id);
  return seat as ISeat;
};

/**

Create a list of seats for a flight
@function
@param {string} flightId - The ID of the flight
@returns {ISeat[]} The list of seats for the specified flight
@private
*/
const createSeatList = (flightId: string) => {
  const seatList: ISeat[] = [];
  const searChart = ['A', 'B', 'C', 'D', 'E', 'F'];
  Array(20)
    .fill(0)
    .forEach((_, index) => {
      searChart.forEach((seat) => {
        seatList.push(
          new Seat({
            flightId,
            type: 'economy',
            position: index + 1,
            isTaken: false,
            code: `${index + 1}${seat}`,
          })
        );
      });
    });

  return seatList;
};
