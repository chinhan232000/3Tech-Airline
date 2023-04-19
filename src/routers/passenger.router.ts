import express from 'express';
import * as passengerController from '../controllers/passenger.controller';
import { authentication } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authentication, passengerController.passengerPage);
router.post('/', authentication, passengerController.createPassenger);

router.post('/:id/update', authentication, passengerController.updatePassenger);
router.get('/:id/delete', authentication, passengerController.deletePassenger);

export default router;
