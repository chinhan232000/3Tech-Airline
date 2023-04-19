import { NextFunction, Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

/**
 * Render the login page.
 * @param req - The request object from the client.
 * @param res - The response object from the server.
 * @param next - The callback function to pass control to the next middleware.
 * @returns A promise that resolves to a response object.
 */
export const loginPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  return res.render('login', { sidebar: null, error: null });
};

/**
 * Handle user login.
 * @param req - The request object from the client.
 * @param res - The response object from the server.
 * @param next - The callback function to pass control to the next middleware.
 * @returns A promise that resolves to a response object.
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await AuthService.login(req.body.email, req.body.password, res);
    return res.redirect('/home');
  } catch (error: any) {
    return res.render('login', { sidebar: null, error: error.message });
  }
};

/**
 * Render the register page.
 * @param req - The request object from the client.
 * @param res - The response object from the server.
 * @param next - The callback function to pass control to the next middleware.
 * @returns A promise that resolves to a response object.
 */
export const registerPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  return res.render('register');
};

/**
 * Handle user registration.
 * @param req - The request object from the client.
 * @param res - The response object from the server.
 * @param next - The callback function to pass control to the next middleware.
 * @returns A promise that resolves to a response object.
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  return res.status(200).json({ message: 'Register' });
};

/**
 * Handle user logout.
 * @param req - The request object from the client.
 * @param res - The response object from the server.
 * @param next - The callback function to pass control to the next middleware.
 * @returns A response object.
 */
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.clearCookie('token');
  return res.redirect('/login');
};
