import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const router = Router();

router.get('/', ProductController.getProducts);
//TODO What the difference between put and patch
router
  .route('/:id')
  .put(ProductController.updateProduct)
  .delete(ProductController.deleteProduct);

export default router;
