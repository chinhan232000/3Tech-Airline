import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import { join, resolve } from 'path';
import routerConfig from './configs/router.config';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { loggerMiddleware } from './middlewares/logger.middleware';
import appConfig from './configs/app.config';
import { Database } from './db/database';
import expressLayouts from 'express-ejs-layouts';
import mongoose from 'mongoose';
import { initAdmin } from './services/auth.service';

const app = express();
const port = appConfig.env.PORT || 3000;

app.use('/static', express.static(join(resolve(), 'public')));
app.use(cookieParser(appConfig.cookie.KEY_SECRET));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

mongoose.set('debug', true);

app.use(loggerMiddleware);

routerConfig(app);

app.use((error: any, request: Request, response: Response, next: NextFunction) => {
  console.log('Tôi đã bắt được lỗi', error);

  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  return response.status(status).send({
    status,
    message,
  });
});

(async () => {
  const db = new Database();
  await db.connect();
  await initAdmin();
})();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
