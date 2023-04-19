import { NextFunction, Request, Response } from 'express';
import * as billService from '../services/bill.service';

/**
 * Retrieve a list of bills and render the bill page.
 * @async
 * @function billPage
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object from the server.
 * @param {NextFunction} next - The callback function to pass control to the next middleware.
 * @returns {Promise<void>}
 */
export const billPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const bills = await billService.getAll(req.query.q as string);
  return res.render('bill', { bills, sidebar: 'bill' });
};

/**
 * Create a new bill.
 * @async
 * @function createBill
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object from the server.
 * @param {NextFunction} next - The callback function to pass control to the next middleware.
 * @returns {Promise<void>}
 */
export const createBill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await billService.create(req.body);
  return res.redirect('/bill');
};

/**
 * Update an existing bill by id.
 * @async
 * @function updateBill
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object from the server.
 * @param {NextFunction} next - The callback function to pass control to the next middleware.
 * @returns {Promise<void>}
 */
export const updateBill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await billService.updateById(req.params.id, req.body);
  return res.redirect('/bill');
};

/**
 * Delete a bill by id.
 * @async
 * @function deleteBill
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object from the server.
 * @param {NextFunction} next - The callback function to pass control to the next middleware.
 * @returns {Promise<void>}
 */
export const deleteBill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await billService.deleteById(req.params.id);
  return res.redirect('/bill');
};
