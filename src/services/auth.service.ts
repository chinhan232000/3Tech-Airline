/**
 * @module passengerService
 * @description This module provides the functions of login registration and initialization of the admin account.
 * @author Nhan Vo
 * @date 12 April 2023
 */
import { Response } from 'express';
import { Passenger } from '../schemas/passenger.schema';
import hashPassword from '../../utils/hash-password';

/**

Handles login functionality for passengers.
@async
@param {string} email - The email of the passenger.
@param {string} password - The password of the passenger.
@param {Response} res - The response object.
@returns {Promise} The response object with a signed cookie containing the user's ID and role.
@throws {Error} If the email does not exist or if the password is incorrect.
*/
export const login = async (email: string, password: string, res: Response) => {
  const isExitEmail = await Passenger.findOne({ email }).lean();
  if (!isExitEmail) {
    throw new Error('Email is not exist');
  }

  if (isExitEmail.password !== hashPassword.sha512(password)) {
    throw new Error('Password is not correct');
  }

  const payload = {
    id: isExitEmail._id,
    role: isExitEmail.email === 'admin@gmail.com' ? 'admin' : 'passenger',
  };

  return res.cookie('token', payload, {
    signed: true,
  });
};

/**

Handles registration functionality for passengers.
@async
@param {string} email - The email of the passenger.
@param {string} password - The password of the passenger.
@returns {Promise<IPassenger>} The newly created passenger object.
@throws {Error} If the email already exists.
*/
export const register = async (email: string, password: string) => {
  const isExitEmail = await Passenger.findOne({ email }).lean();
  if (isExitEmail) {
    throw new Error('Email is exist');
  }

  const newPassenger = new Passenger({
    email,
    password: hashPassword.sha512(password),
  });

  await newPassenger.save();

  return newPassenger;
};

/**

Initializes an admin account if one does not exist.
@async
@returns {Promise<void>}
*/
export const initAdmin = async () => {
  const isExitAdmin = await Passenger.findOne({ email: 'admin@gmail.com' }).lean();
  if (isExitAdmin) {
    return;
  }

  const newPassenger = new Passenger({
    email: 'admin@gmail.com',
    password: hashPassword.sha512('admin'),
    username: 'admin',
  });

  await newPassenger.save();
};
