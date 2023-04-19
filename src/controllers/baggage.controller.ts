import { NextFunction, Request, Response } from 'express';
import * as baggageService from '../services/baggage.service';

/**

Render the baggage page with a list of all existing baggage.
@param {Request} req - The request object from the client.
@param {Response} res - The response object from the server.
@param {NextFunction} next - The callback function to pass control to the next middleware.
@returns {Promise<void>}
*/
export const baggagePage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const baggages = await baggageService.getAll(req.query.q as string);
  return res.render('baggage', { baggages, sidebar: 'baggage' });
};
/**
  
  Create a new baggage.
  @param {Request} req - The request object from the client.
  @param {Response} res - The response object from the server.
  @param {NextFunction} next - The callback function to pass control to the next middleware.
  @returns {Promise<void>}
  */
export const createBaggage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await baggageService.create(req.body);
  return res.redirect('/baggage');
};
/**
  
  Update an existing baggage by id.
  @param {Request} req - The request object from the client.
  @param {Response} res - The response object from the server.
  @param {NextFunction} next - The callback function to pass control to the next middleware.
  @returns {Promise<void>}
  */
export const updateBaggage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await baggageService.updateById(req.params.id, req.body);
  return res.redirect('/baggage');
};
/**
  
  Delete a baggage by id.
  @param {Request} req - The request object from the client.
  @param {Response} res - The response object from the server.
  @param {NextFunction} next - The callback function to pass control to the next middleware.
  @returns {Promise<void>}
  */
export const deleteBaggage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await baggageService.deleteById(req.params.id);
  return res.redirect('/baggage');
};
