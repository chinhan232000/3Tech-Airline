import { NextFunction, Request, Response } from 'express';
import * as airportService from '../services/airport.service';

/**
 * Get the list of all airports and render the airport page.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 * @returns A rendered view of the airport page with a list of airports.
 */
export const airportPage = async (req: Request, res: Response, next: NextFunction) => {
  const airports = await airportService.getAll(req.query.q as string);
  return res.render('airport', { airports, sidebar: 'airport' });
};

/**
 * Create a new airport.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 * @returns A redirect to the airport page.
 */
export const createAirport = async (req: Request, res: Response, next: NextFunction) => {
  await airportService.create(req.body);
  return res.redirect('/airport');
};

/**
 * Update an airport by its ID.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 * @returns A redirect to the airport page.
 */
export const updateAirport = async (req: Request, res: Response, next: NextFunction) => {
  await airportService.updateById(req.params.id, req.body);
  return res.redirect('/airport');
};

/**
 * Delete an airport by its ID.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 * @returns A redirect to the airport page.
 */
export const deleteAirport = async (req: Request, res: Response, next: NextFunction) => {
  await airportService.deleteById(req.params.id);
  return res.redirect('/airport');
};
