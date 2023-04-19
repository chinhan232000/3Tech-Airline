/**
 * @module passengerService
 * @description This module provides functions for interacting with the Passenger collection in the database.
 * @author Nhan Vo
 * @date 16 April 2023
 */
import hashPassword from '../../utils/hash-password';
import { IPassenger } from '../interfaces/passenger.interface';
import { Passenger } from '../schemas/passenger.schema';

/**

Retrieves all passengers that match a certain query string.
@param q - The query string to match against the passenger's name or username.
@returns A Promise that resolves to an array of IPassenger objects that match the query string.
*/
export const getAll = async (q: string): Promise<IPassenger[]> => {
  const passengers = await Passenger.find({
    $or: [
      { name: { $regex: q || '', $options: 'i' } },
      { username: { $regex: q || '', $options: 'i' } },
      // { email: { $regex: search, $options: 'i' } },
    ],
  });

  return passengers;
};

/**

Retrieves a single passenger by their ID.
@param id - The ID of the passenger to retrieve.
@returns A Promise that resolves to an IPassenger object.
*/
export const getById = async (id: string): Promise<IPassenger> => {
  const passenger = await Passenger.findById(id);
  return passenger as IPassenger;
};

/**

Creates a new passenger.
@param passenger - The passenger object to create.
@returns A Promise that resolves to the newly created IPassenger object.
*/
export const create = async (passenger: IPassenger): Promise<IPassenger> => {
  const password = hashPassword.sha512('123456');
  const newPassenger = new Passenger({
    ...passenger,
    password,
  });
  return newPassenger.save();
};

/**

Updates a passenger by their ID.
@param id - The ID of the passenger to update.
@param passenger - The passenger object with the updated data.
@returns A Promise that resolves to the updated IPassenger object.
@throws An Error if the passenger with the given ID cannot be found.
*/
export const updateById = async (id: string, passenger: IPassenger): Promise<IPassenger> => {
  const isExistPassenger = await Passenger.findById(id).lean();
  if (!isExistPassenger) {
    throw new Error('Passenger not found');
  }

  const passengerUpdate = await Passenger.findByIdAndUpdate(id, passenger, { new: true });

  return passengerUpdate as IPassenger;
};

/**

Deletes a passenger by their ID.
@param id - The ID of the passenger to delete.
@returns A Promise that resolves to the deleted IPassenger object.
*/
export const deleteById = async (id: string): Promise<IPassenger> => {
  const passenger = await Passenger.findByIdAndDelete(id);
  return passenger as IPassenger;
};
