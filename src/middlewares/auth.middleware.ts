import { NextFunction, Request, Response } from 'express';
import * as passengerService from '../services/passenger.service';

/**

Middleware function for user authentication
@param req - Express Request object
@param res - Express Response object
@param next - Express NextFunction object
@returns {void}
*/
export const authentication = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  console.log(req.signedCookies['token']);
  if (!req.signedCookies['token']) {
    return res.redirect('/login');
  }

  const payload = req.signedCookies['token'];

  const user = await passengerService.getById(payload.id);

  res.app.locals.user = user;
  req.user = payload;

  next();
};
