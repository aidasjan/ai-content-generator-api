import { Router } from 'express'
import { categoryRouter } from '../domain/category'
import { propertyRouter } from '../domain/property'
import { contentRouter } from '../domain/content'
import { userRouter } from '../domain/user'

const router = Router()

router.use('/users', userRouter)
router.use('/contents', contentRouter)
router.use('/categories', categoryRouter)
router.use('/properties', propertyRouter)

export default router
