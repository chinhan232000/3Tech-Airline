import express from 'express';
import * as billController from '../controllers/bill.controller';
import { authentication } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authentication, billController.billPage);
router.post('/', authentication, billController.createBill);

router.post('/:id/update', authentication, billController.updateBill);
router.get('/:id/delete', authentication, billController.deleteBill);

export default router;
