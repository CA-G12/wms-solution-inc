import { Router } from 'express';
import { getProducts } from '../controllers/ProductController';

const router: Router = Router();
router.get('/products', getProducts);

export default router;
