import { Router } from 'express'
import {
  create,
  deleteSingle,
  getAllByUser,
  getAllPublic,
  getSingle,
  publish,
  save
} from './content.controller'
import { authenticate, requireUser } from '../../utils/auth'

const router = Router()

router.route('/').get(getAllPublic)
router.route('/self').get(authenticate(), requireUser(), getAllByUser)
router.route('/:id').get(getSingle)
router.route('/:id/publish').post(authenticate(), requireUser(), publish)
router.route('/:id/save').post(authenticate(), requireUser(), save)
router.route('/:id').delete(authenticate(), requireUser(), deleteSingle)
router.route('/create').post(authenticate(), requireUser(), create)

export default router
