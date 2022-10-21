import * as authController from '../controllers/AuthController';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/check-login', authController.checkLogin);

export default authRouter;
