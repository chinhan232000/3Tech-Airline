import express from 'express';
import * as seatController from '../controllers/seat.controller';
import { authentication } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authentication, seatController.seatPage);
router.post('/', authentication, seatController.createSeat);

router.post('/:id/update', authentication, seatController.updateSeat);
router.get('/:id/delete', authentication, seatController.deleteSeat);

export default router;
