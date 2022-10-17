import { Router } from 'express'
import { getProducts } from '../controllers/ProductsController'
// import {
// } from '../controllers';
// import { userAuth, checkInterviewer } from '../middlewares/auth';

const router: Router = Router()

router.get('/products', getProducts)

export default router
