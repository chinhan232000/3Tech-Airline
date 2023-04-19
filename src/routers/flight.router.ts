import express from 'express';
import * as flightController from '../controllers/flight.controller';
import { authentication } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authentication, flightController.flightPage);
router.post('/', authentication, flightController.createFlight);

// router.post('/find-flight', authentication, flightController.findFlight);

router.post('/:id/update', authentication, flightController.updateFlight);
router.get('/:id/delete', authentication, flightController.deleteFlight);

export default router;
