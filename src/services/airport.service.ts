/**
 * @module airportService
 * @description This module provides functions for interacting with the Airport collection in the database.
 * @author Nhan Vo
 * @date 11 April 2023
 */
import { IAirport } from '../interfaces/airport.interface';
import { Airport } from '../schemas/airport.schema';

/**

Returns an array of airports that match the query
@param {string} q - The search query
@returns {Promise<IAirport[]>} An array of airports that match the query
*/
export const getAll = async (q: string): Promise<IAirport[]> => {
  const airports = await Airport.find({
    $or: [
      { name: { $regex: q || '', $options: 'i' } },
      { username: { $regex: q || '', $options: 'i' } },
      // { email: { $regex: search, $options: 'i' } },
    ],
  });

  return airports;
};

/**

Returns an airport with the given ID
@param {string} id - The ID of the airport to retrieve
@returns {Promise<IAirport>} The airport with the given ID
*/
export const getById = async (id: string): Promise<IAirport> => {
  const airport = await Airport.findById(id);
  return airport as IAirport;
};

/**

Creates a new airport
@param {IAirport} airport - The airport to create
@returns {Promise<IAirport>} The created airport
*/
export const create = async (airport: IAirport): Promise<IAirport> => {
  const newAirport = new Airport(airport);
  return newAirport.save();
};

/**

Updates an airport with the given ID
@param {string} id - The ID of the airport to update
@param {IAirport} airport - The airport data to update
@returns {Promise<IAirport>} The updated airport
@throws {Error} If the airport with the given ID does not exist
*/
export const updateById = async (id: string, airport: IAirport): Promise<IAirport> => {
  const isExistAirport = await Airport.findById(id).lean();
  if (!isExistAirport) {
    throw new Error('Airport not found');
  }

  const airportUpdate = await Airport.findByIdAndUpdate(id, airport, { new: true });

  return airportUpdate as IAirport;
};

/**

Deletes an airport with the given ID
@param {string} id - The ID of the airport to delete
@returns {Promise<IAirport>} The deleted airport
*/
export const deleteById = async (id: string): Promise<IAirport> => {
  const airport = await Airport.findByIdAndDelete(id);
  return airport as IAirport;
};
