import { NextFunction, Request, Response } from 'express';
import * as passengerService from '../services/passenger.service';

/**

Render the passenger page with the list of passengers
@param {Request} req - The HTTP request object
@param {Response} res - The HTTP response object
@param {NextFunction} next - The function to call to pass control to the next middleware function
@returns {Promise<void>} - The Promise object representing the asynchronous operation
*/
export const passengerPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const passengers = await passengerService.getAll(req.query.q as string);
  return res.render('passenger', { passengers, sidebar: 'passenger' });
};
/**
  
  Create a new passenger
  @param {Request} req - The HTTP request object
  @param {Response} res - The HTTP response object
  @param {NextFunction} next - The function to call to pass control to the next middleware function
  @returns {Promise<void>} - The Promise object representing the asynchronous operation
  */
export const createPassenger = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await passengerService.create(req.body);
  return res.redirect('/passenger');
};
/**
  
  Update a passenger by ID
  @param {Request} req - The HTTP request object
  @param {Response} res - The HTTP response object
  @param {NextFunction} next - The function to call to pass control to the next middleware function
  @returns {Promise<void>} - The Promise object representing the asynchronous operation
  */
export const updatePassenger = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await passengerService.updateById(req.params.id, req.body);
  return res.redirect('/passenger');
};
/**
  
  Delete a passenger by ID
  @param {Request} req - The HTTP request object
  @param {Response} res - The HTTP response object
  @param {NextFunction} next - The function to call to pass control to the next middleware function
  @returns {Promise<void>} - The Promise object representing the asynchronous operation
  */
export const deletePassenger = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await passengerService.deleteById(req.params.id);
  return res.redirect('/passenger');
};
