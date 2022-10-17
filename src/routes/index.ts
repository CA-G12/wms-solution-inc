import { Router } from 'express'
import productsRouter from './ProductsRoute'

const router: Router = Router()
router.use(productsRouter)

export default router
