import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const router = Router();

router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);
router.post('/all', CategoryController.getAll);
router.post('/search/', CategoryController.getByName);

export default router;
