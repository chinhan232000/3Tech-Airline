import express from 'express';
import * as airlineController from '../controllers/airline.controller';
import { authentication } from '../middlewares/auth.middleware';
import { uploadDiskStorage } from '../middlewares/upload.middleware';

const router = express.Router();

router.get('/', authentication, airlineController.airlinePage);
router.post('/', authentication, uploadDiskStorage.single('logo'), airlineController.createAirline);

router.post('/:id/update', authentication, uploadDiskStorage.single('logo'), airlineController.updateAirline);
router.get('/:id/delete', authentication, airlineController.deleteAirline);

export default router;
