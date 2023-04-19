import express from 'express';
import * as homeController from '../controllers/home.controller';
import { authentication } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authentication, homeController.homePage);

export default router;
