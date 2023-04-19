import { NextFunction, Request, Response } from 'express';

/**

Render the home page.
@param req - The HTTP request.
@param res - The HTTP response.
@param next - The next middleware function.
*/
export const homePage = async (req: Request, res: Response, next: NextFunction) => {
  return res.render('home', { sidebar: 'home' });
};
