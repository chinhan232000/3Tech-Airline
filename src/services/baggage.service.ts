/**
 * @module baggageService
 * @description This module provides functions for interacting with the Baggage collection in the database.
 * @author Nhan Vo
 * @date 13 April 2023
 */
import { IBaggage } from '../interfaces/baggage.interface';
import { Baggage } from '../schemas/baggage.schema';

/**

Retrieves all baggage
@param {string} q - The query string
@returns {Promise<IBaggage[]>} - The list of baggage
*/
export const getAll = async (q: string): Promise<IBaggage[]> => {
  const baggages = await Baggage.find({});

  return baggages;
};

/**

Retrieves a baggage by id
@param {string} id - The id of the baggage to retrieve
@returns {Promise<IBaggage>} - The retrieved baggage
@throws {Error} - Throws an error if the baggage with the specified id is not found
*/
export const getById = async (id: string): Promise<IBaggage> => {
  const baggage = await Baggage.findById(id);
  return baggage as IBaggage;
};

/**

Creates a new baggage
@param {IBaggage} baggage - The baggage to create
@returns {Promise<IBaggage>} - The created baggage
*/
export const create = async (baggage: IBaggage): Promise<IBaggage> => {
  const newBaggage = new Baggage(baggage);
  return newBaggage.save();
};

/**

Updates a baggage by id
@param {string} id - The id of the baggage to update
@param {IBaggage} baggage - The updated baggage
@returns {Promise<IBaggage>} - The updated baggage
@throws {Error} - Throws an error if the baggage with the specified id is not found
*/
export const updateById = async (id: string, baggage: IBaggage): Promise<IBaggage> => {
  const isExistBaggage = await Baggage.findById(id).lean();
  if (!isExistBaggage) {
    throw new Error('Baggage not found');
  }

  const baggageUpdate = await Baggage.findByIdAndUpdate(id, baggage, { new: true });

  return baggageUpdate as IBaggage;
};

/**

Deletes a baggage by id
@param {string} id - The id of the baggage to delete
@returns {Promise<IBaggage>} - The deleted baggage
@throws {Error} - Throws an error if the baggage with the specified id is not found
*/
export const deleteById = async (id: string): Promise<IBaggage> => {
  const baggage = await Baggage.findByIdAndDelete(id);
  return baggage as IBaggage;
};
