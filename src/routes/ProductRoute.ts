import { Router } from 'express';
import { updateProduct } from '../controllers/ProductController';

const router = Router();

router.put('/products/id', updateProduct);
