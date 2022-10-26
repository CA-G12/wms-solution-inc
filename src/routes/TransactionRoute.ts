import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';

const router = Router();

router.delete('/:id', TransactionController.delete);
router.get('/', TransactionController.search);

export default router;
