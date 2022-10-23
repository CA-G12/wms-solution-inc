import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const router: Router = Router();
router.get('/products', ProductController.getProducts);

export default router;
