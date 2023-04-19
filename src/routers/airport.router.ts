import express from 'express';
import * as airportController from '../controllers/airport.controller';
import { authentication } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authentication, airportController.airportPage);
router.post('/', authentication, airportController.createAirport);

router.post('/:id/update', authentication, airportController.updateAirport);
router.get('/:id/delete', authentication, airportController.deleteAirport);

export default router;
