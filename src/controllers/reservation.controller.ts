import { NextFunction, Request, Response } from 'express';
import * as reservationService from '../services/reservation.service';
import * as flightService from '../services/flight.service';
import * as seatService from '../services/seat.service';
import * as airportService from '../services/airport.service';

/**

Renders the reservation page with a list of flights and airports based on the query parameters.
@function
@async
@param {Request} req - The request object.
@param {Response} res - The response object.
@param {NextFunction} next - The next middleware function.
@returns {Promise<void>} - A promise that resolves with the rendered reservation page.
*/
export const reservationPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { arrivalDate, departureDate, from, to } = req.query as any;
  const flights = await flightService.findFlight(arrivalDate, departureDate, from, to);
  const airports = await airportService.getAll(req.query.q as string);
  return res.render('reservation', { flights, airports, sidebar: 'reservation' });
};
/**
  
  Renders the ticket page with a list of tickets belonging to the authenticated user.
  @function
  @async
  @param {any} req - The request object.
  @param {Response} res - The response object.
  @param {NextFunction} next - The next middleware function.
  @returns {Promise<void>} - A promise that resolves with the rendered ticket page.
  */
export const ticketPage = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  const tickets = await reservationService.getAll(req.user.id);
  console.log(tickets);
  return res.render('ticket', { tickets, sidebar: 'ticket' });
};

/**
  
  Renders the ticket detail page with the details of the specified ticket.
  @function
  @async
  @param {Request} req - The request object.
  @param {Response} res - The response object.
  @param {NextFunction} next - The next middleware function.
  @returns {Promise<void>} - A promise that resolves with the rendered ticket detail page.
  */
export const ticketPageDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const ticket = await reservationService.getById(req.params.id);
  return res.render('ticket-detail', { ticket, sidebar: null });
};
/**
  
  Creates a new reservation and marks the seat as taken.
  @function
  @async
  @param {any} req - The request object.
  @param {Response} res - The response object.
  @param {NextFunction} next - The next middleware function.
  @returns {Promise<void>} - A promise that resolves with a redirect to the ticket page.
  */
export const createReservation = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  await reservationService.create(req.body, req.user.id);
  await seatService.updateById(req.body.seatId, { isTaken: true });
  return res.redirect('/ticket');
};
/**
  
  Updates the details of the specified reservation.
  @function
  @async
  @param {Request} req - The request object.
  @param {Response} res - The response object.
  @param {NextFunction} next - The next middleware function.
  @returns {Promise<void>} - A promise that resolves with a redirect to the reservation page.
  */
export const updateReservation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await reservationService.updateById(req.params.id, req.body);
  return res.redirect('/reservation');
};

/**
 * Delete a reservation by ID
 * @route DELETE /reservation/:id
 * @group Reservation
 * @param {string} id.path.required - reservation ID
 * @returns {object} 200 - Success message
 * @returns {Error}  500 - Unexpected error
 */
export const deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
  await reservationService.deleteById(req.params.id);
  return res.redirect('/reservation');
};
