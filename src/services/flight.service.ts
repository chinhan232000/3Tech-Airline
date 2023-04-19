/**
 * @module flightService
 * @description This module provides functions for interacting with the Flight collection in the database.
 * @author Nhan Vo
 * @date 15 April 2023
 */

import { randomString } from '../../utils/util';
import { IFlight } from '../interfaces/flight.interface';
import { Flight } from '../schemas/flight.schema';
import { createFullSeat } from './seat.service';

/**
 * Finds flights that match the given query criteria.
 * @param {Date} arrivalDate The arrival date of the flight.
 * @param {Date} departureDate The departure date of the flight.
 * @param {string} from The origin airport code of the flight.
 * @param {string} to The destination airport code of the flight.
 * @returns {Promise<IFlight[]>} A Promise that resolves to an array of flights.
 */
export const findFlight = async (arrivalDate: Date, departureDate: Date, from: string, to: string): Promise<IFlight[]> => {
  const query: any = {};

  if (arrivalDate) {
    query['arrivalDate'] = { $gte: arrivalDate };
  }

  if (departureDate) {
    query['departureDate'] = { $lte: departureDate };
  }

  if (from) {
    query['from'] = from;
  }

  if (to) {
    query['to'] = to;
  }

  const flights = await Flight.find(query).populate('airlineId').populate('from').populate('to');

  return flights;
};

/**
 * Gets all flights from the database.
 * @param {string} q Optional query parameter to search for flights.
 * @returns {Promise<IFlight[]>} A Promise that resolves to an array of flights.
 */
export const getAll = async (q: string): Promise<IFlight[]> => {
  const flights = await Flight.find().populate('airlineId').populate('from').populate('to');

  return flights;
};

/**
 * Gets a flight by its ID.
 * @param {string} id The ID of the flight to retrieve.
 * @returns {Promise<IFlight>} A Promise that resolves to the retrieved flight.
 */
export const getById = async (id: string): Promise<IFlight> => {
  const flight = await Flight.findById(id);
  return flight as IFlight;
};

/**
 * Creates a new flight.
 * @param {IFlight} flight The flight object to create.
 * @returns {Promise<IFlight>} A Promise that resolves to the created flight.
 */
export const create = async (flight: IFlight): Promise<IFlight> => {
  const newFlight = new Flight({
    ...flight,
    code: `VN${randomString(2)}${Date.now()}`,
  });

  await createFullSeat(newFlight._id);

  return newFlight.save();
};

/**
 * Updates an existing flight by its ID.
 * @param {string} id The ID of the flight to update.
 * @param {IFlight} flight The updated flight object.
 * @returns {Promise<IFlight>} A Promise that resolves to the updated flight.
 * @throws {Error} Throws an error if the flight with the given ID doesn't exist.
 */
export const updateById = async (id: string, flight: IFlight): Promise<IFlight> => {
  const isExistFlight = await Flight.findById(id).lean();
  if (!isExistFlight) {
    throw new Error('Flight not found');
  }

  const flightUpdate = await Flight.findByIdAndUpdate(id, flight, { new: true });

  return flightUpdate as IFlight;
};

/**
 * Deletes a flight by its ID.
 * @param {string} id The ID of the flight to delete.
 * @returns {Promise<IFlight>} A Promise that resolves to the deleted flight.
 */
export const deleteById = async (id: string): Promise<IFlight> => {
  const flight = await Flight.findByIdAndDelete(id);
  return flight as IFlight;
};
