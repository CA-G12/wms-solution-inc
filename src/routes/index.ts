import { NextFunction, Request, Response, Router } from 'express';
import GenericError from '../helpers/GenericError';
import authRouter from './AuthRoute';
import userRouter from './UserRoute';
import productsRouter from './ProductsRoute';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(productsRouter);

router.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const exception = err as GenericError;
  res.status(exception.status || 500).json({
    statusCode: exception.status || 500,
    error:
      exception.name === 'GenericError'
        ? exception.message
        : 'Internal Server Error'
  });
});

export default router;
