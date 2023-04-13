import { type Errback, type Request, type Response } from 'express'
import {
  getAllCategories,
  addCategory,
  deleteCategory
} from './category.service'

export const getAll = (req: Request, res: Response, next: Errback) => {
  getAllCategories()
    .then((result) => res.json(result))
    .catch((err) => {
      next(err)
    })
}

export const addNew = (req: Request, res: Response, next: Errback) => {
  addCategory(req.body)
    .then((result) => res.json(result))
    .catch((err) => {
      next(err)
    })
}

export const deleteSingle = (req: Request, res: Response, next: Errback) => {
  deleteCategory(req.params.id)
    .then(() => res.json({ message: 'Deleted' }))
    .catch((err) => {
      next(err)
    })
}
