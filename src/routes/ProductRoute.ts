import { Router } from 'express';
import * as productControllers from '../controllers/ProductController';
import * as authMiddleware from '../middlewares/AuthMiddleware';

const productRouter = Router();

productRouter.put(
  '/products/:id',
  authMiddleware.authUser,
  productControllers.updateProduct
);

export default productRouter;
