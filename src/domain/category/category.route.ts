import { Router } from 'express'
import { addNew, deleteSingle, getAll } from './category.controller'
import { authenticate, requireAdmin } from '../../utils/auth'

const router = Router()

router.route('/').get(getAll)
router.route('/').post(authenticate(), requireAdmin(), addNew)
router.route('/:id').delete(authenticate(), requireAdmin(), deleteSingle)

export default router
