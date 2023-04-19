import express from 'express';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/login', authController.loginPage);
router.get('/register', authController.registerPage);

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/logout', authController.logout);

export default router;
