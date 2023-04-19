import { NextFunction, Request, Response } from 'express';
import * as seatService from '../services/seat.service';

/**

Get all seats of a flight
@param req - The incoming request
@param res - The outgoing response
@param next - The next function to call
@returns A JSON object containing all the seats of the specified flight
*/
export const seatPage = async (req: Request, res: Response, next: NextFunction) => {
  const seats = await seatService.getAll(req.query.flightId as string);
  return res.json(seats);
};
/**
  
  Create a new seat
  @param req - The incoming request
  @param res - The outgoing response
  @param next - The next function to call
  @returns A redirect to the seat page
  */
export const createSeat = async (req: Request, res: Response, next: NextFunction) => {
  await seatService.create(req.body);
  return res.redirect('/seat');
};
/**
  
  Update an existing seat by ID
  @param req - The incoming request
  @param res - The outgoing response
  @param next - The next function to call
  @returns A redirect to the seat page
  */
export const updateSeat = async (req: Request, res: Response, next: NextFunction) => {
  await seatService.updateById(req.params.id, req.body);
  return res.redirect('/seat');
};
/**
  
  Delete a seat by ID
  @param req - The incoming request
  @param res - The outgoing response
  @param next - The next function to call
  @returns A redirect to the seat page
  */
export const deleteSeat = async (req: Request, res: Response, next: NextFunction) => {
  await seatService.deleteById(req.params.id);
  return res.redirect('/seat');
};
