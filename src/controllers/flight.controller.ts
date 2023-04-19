import { NextFunction, Request, Response } from 'express';
import * as flightService from '../services/flight.service';
import * as airlineService from '../services/airline.service';
import * as airportService from '../services/airport.service';

/**

Render the flight page with flights, airlines and airports information
@function
@async
@param {Request} req - The request object
@param {Response} res - The response object
@param {NextFunction} next - The next middleware function
@returns {Promise<void>} - The Promise object representing the void value
*/
export const flightPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const airline = await airlineService.getAll(req.query.q as string);
  const flights = await flightService.getAll(req.query.q as string);
  const airports = await airportService.getAll(req.query.q as string);
  return res.render('flight', { flights: flights, airline: airline, airports, sidebar: 'flight' });
};

/**
  
  Create a new flight
  @function
  @async
  @param {Request} req - The request object
  @param {Response} res - The response object
  @param {NextFunction} next - The next middleware function
  @returns {Promise<void>} - The Promise object representing the void value
  */
export const createFlight = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await flightService.create(req.body);
  return res.redirect('/flight');
};
/**
  
  Update an existing flight by ID
  @function
  @async
  @param {Request} req - The request object
  @param {Response} res - The response object
  @param {NextFunction} next - The next middleware function
  @returns {Promise<void>} - The Promise object representing the void value
  */
export const updateFlight = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await flightService.updateById(req.params.id, req.body);
  return res.redirect('/flight');
};
/**
  
  Delete a flight by ID
  @function
  @async
  @param {Request} req - The request object
  @param {Response} res - The response object
  @param {NextFunction} next - The next middleware function
  @returns {Promise<void>} - The Promise object representing the void value
  */
export const deleteFlight = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await flightService.deleteById(req.params.id);
  return res.redirect('/flight');
};
