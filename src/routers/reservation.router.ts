import express from 'express';
import * as reservationController from '../controllers/reservation.controller';
import { authentication } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authentication, reservationController.reservationPage);
router.post('/', authentication, reservationController.createReservation);

router.post('/:id/update', authentication, reservationController.updateReservation);
router.get('/:id/delete', authentication, reservationController.deleteReservation);

export default router;
