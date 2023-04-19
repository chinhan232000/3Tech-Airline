import express from 'express';
import * as airlineController from '../controllers/airline.controller';
import { authentication } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authentication, airlineController.airlinePage);
router.post('/', authentication, airlineController.createAirline);

router.post('/:id/update', authentication, airlineController.updateAirline);
router.get('/:id/delete', authentication, airlineController.deleteAirline);

export default router;
