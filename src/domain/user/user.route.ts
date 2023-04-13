import { Router } from 'express'
import { register, getAll, login, deleteSingle } from './user.controller'
import { authenticate, requireAdmin } from '../../utils/auth'

const router = Router()

router.route('/').get(authenticate(), requireAdmin(), getAll)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/:id').delete(authenticate(), requireAdmin(), deleteSingle)

export default router
