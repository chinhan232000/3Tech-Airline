import express from 'express';
import * as reservationController from '../controllers/reservation.controller';
import { authentication } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authentication, reservationController.ticketPage);
router.get('/:id', authentication, reservationController.ticketPageDetail);

router.get('/:id/delete', authentication, reservationController.deleteReservation);

export default router;
