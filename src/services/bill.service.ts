/**
 * @module billService
 * @description This module provides functions for interacting with the Bill collection in the database.
 * @author Nhan Vo
 * @date 14 April 2023
 */
import { IBill } from '../interfaces/bill.interface';
import { Bill } from '../schemas/bill.schema';

/**

Fetch all bills
@param q - The query string
@returns The list of bills
*/
export const getAll = async (q: string): Promise<IBill[]> => {
  const bills = await Bill.find({});

  return bills;
};

/**

Fetch a bill by its ID
@param id - The ID of the bill to fetch
@returns The bill object
*/
export const getById = async (id: string): Promise<IBill> => {
  const bill = await Bill.findById(id);
  return bill as IBill;
};

/**

Create a new bill
@param bill - The bill object to create
@returns The newly created bill object
*/
export const create = async (bill: IBill): Promise<IBill> => {
  const newBill = new Bill(bill);
  return newBill.save();
};

/**

Update a bill by its ID
@param id - The ID of the bill to update
@param bill - The bill object with updated fields
@returns The updated bill object
@throws Error if the bill is not found
*/
export const updateById = async (id: string, bill: IBill): Promise<IBill> => {
  const isExistBill = await Bill.findById(id).lean();
  if (!isExistBill) {
    throw new Error('Bill not found');
  }

  const billUpdate = await Bill.findByIdAndUpdate(id, bill, { new: true });

  return billUpdate as IBill;
};

/**

Delete a bill by its ID
@param id - The ID of the bill to delete
@returns The deleted bill object
*/
export const deleteById = async (id: string): Promise<IBill> => {
  const bill = await Bill.findByIdAndDelete(id);
  return bill as IBill;
};
