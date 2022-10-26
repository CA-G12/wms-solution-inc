import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const router = Router();

router.get('/', ProductController.getProducts);
//TODO What the difference between put and patch
router.put('/:id', ProductController.updateProduct);

export default router;
