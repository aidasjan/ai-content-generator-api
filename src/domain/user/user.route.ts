import { Router } from 'express'
import { register, getAll, login, deleteSingle, makeAdmin } from './user.controller'
import { authenticate, requireAdmin } from '../../utils/auth'

const router = Router()

router.route('/').get(authenticate(), requireAdmin(), getAll)
// router.route('/register').post(register)
router.route('/login').post(login)
router.route('/:id').delete(authenticate(), requireAdmin(), deleteSingle)
router.route('/:id/admin').put(authenticate(), requireAdmin(), makeAdmin)

export default router
