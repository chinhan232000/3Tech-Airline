/**
 * @module airlineService
 * @description This module provides functions for interacting with the Airline collection in the database.
 * @author Nhan Vo
 * @date 10 April 2023
 */
import appConfig from '../configs/app.config';
import { IAirline } from '../interfaces/airline.interface';
import { Airline } from '../schemas/airline.schema';

/**
Returns all airlines with name or username containing a given search query
@param q - the search query
@returns a Promise that resolves to an array of airline documents
*/
export const getAll = async (q: string): Promise<IAirline[]> => {
  const airlines = await Airline.find({
    $or: [
      { name: { $regex: q || '', $options: 'i' } },
      { username: { $regex: q || '', $options: 'i' } },
      // { email: { $regex: search, $options: 'i' } },
    ],
  });

  return airlines;
};

/**

Returns an airline document with the given ID
@param id - the ID of the airline document to retrieve
@returns a Promise that resolves to the airline document
@throws an error if the airline document cannot be found
*/
export const getById = async (id: string): Promise<IAirline> => {
  const airline = await Airline.findById(id);
  return airline as IAirline;
};

/**

Creates a new airline document with the given data
@param airline - the data for the new airline document
@param logo - the URL of the logo to associate with the new airline document
@returns a Promise that resolves to the new airline document
*/
export const create = async (airline: IAirline, logo: string): Promise<IAirline> => {
  const newAirline = new Airline({
    ...airline,
    logo: `http://localhost:${appConfig.env.PORT}/static/uploads/${logo}`,
  });

  return newAirline.save();
};

/**

Updates an existing airline document with the given ID and data
@param id - the ID of the airline document to update
@param airline - the updated data for the airline document
@returns a Promise that resolves to the updated airline document
@throws an error if the airline document cannot be found
*/
export const updateById = async (id: string, airline: IAirline): Promise<IAirline> => {
  const isExistAirline = await Airline.findById(id).lean();
  if (!isExistAirline) {
    throw new Error('Airline not found');
  }

  const airlineUpdate = await Airline.findByIdAndUpdate(id, airline, { new: true });

  return airlineUpdate as IAirline;
};

/**

Deletes an airline document with the given ID
@param id - the ID of the airline document to delete
@returns a Promise that resolves to the deleted airline document
*/
export const deleteById = async (id: string): Promise<IAirline> => {
  const airline = await Airline.findByIdAndDelete(id);
  return airline as IAirline;
};
