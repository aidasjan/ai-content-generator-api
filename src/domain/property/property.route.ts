import { Router } from 'express'
import { addNew, deleteSingle, edit, getAll } from './property.controller'
import { authenticate, requireAdmin } from '../../utils/auth'

const router = Router()

router.route('/').get(getAll)
router.route('/').post(authenticate(), addNew)
router.route('/:id').put(authenticate(), requireAdmin(), edit)
router.route('/:id').delete(authenticate(), requireAdmin(), deleteSingle)

export default router
