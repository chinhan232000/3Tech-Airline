import { NextFunction, Request, Response } from 'express';
import { HTTP_METHOD } from '../constants/http-method';
import { yellow, green, red, blue, gray } from 'chalk';

/**

Log HTTP requests and responses middleware
@param req - Express Request object
@param res - Express Response object
@param next - NextFunction to continue the middleware chain
*/
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.on('close', () => {
    const { statusCode } = res;
    const logMethod =
      req.method === HTTP_METHOD.GET
        ? green(req.method)
        : req.method === HTTP_METHOD.POST
        ? yellow(req.method)
        : req.method === HTTP_METHOD.PUT
        ? blue(req.method)
        : req.method === HTTP_METHOD.DELETE
        ? red(req.method)
        : gray(req.method);

    console.log(
      `[${logMethod}]  ${statusCode === 200 ? green(statusCode) : red(statusCode)}  ${yellow(req.originalUrl)}  ${
        req.get('user-agent') || ''
      }`
    );
  });

  next();
};
