import { NextFunction, Request, Response } from 'express';
import * as airlineService from '../services/airline.service';

/**
 * Return the page for displaying a list of airlines.
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object from the server.
 * @param {NextFunction} next - The callback function to pass control to the next middleware.
 * @returns {Promise<void>}
 */
export const airlinePage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const airlines = await airlineService.getAll(req.query.q as string);
  return res.render('airline', { airlines, sidebar: 'airline' });
};

/**
 * Create a new airline.
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object from the server.
 * @param {NextFunction} next - The callback function to pass control to the next middleware.
 * @returns {Promise<void>}
 */
export const createAirline = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.file) {
    return res.redirect('/airline');
  }

  await airlineService.create(req.body, req.file?.filename);
  return res.redirect('/airline');
};

/**
 * Update the information of an airline by id.
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object from the server.
 * @param {NextFunction} next - The callback function to pass control to the next middleware.
 * @returns {Promise<void>}
 */
export const updateAirline = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await airlineService.updateById(req.params.id, req.body);
  return res.redirect('/airline');
};

/**
 * Delete an airline by id.
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object from the server.
 * @param {NextFunction} next - The callback function to pass control to the next middleware.
 * @returns {Promise<void>}
 */
export const deleteAirline = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await airlineService.deleteById(req.params.id);
  return res.redirect('/airline');
};
