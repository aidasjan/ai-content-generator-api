import { type Errback, type Request, type Response } from 'express'
import {
  getAllProperties,
  addProperty,
  deleteProperty,
  editProperty
} from './property.service'

export const getAll = (req: Request, res: Response, next: Errback) => {
  getAllProperties()
    .then((result) => res.json(result))
    .catch((err) => {
      next(err)
    })
}

export const addNew = (req: Request, res: Response, next: Errback) => {
  addProperty(req.body)
    .then((result) => res.json(result))
    .catch((err) => {
      next(err)
    })
}

export const edit = (req: Request, res: Response, next: Errback) => {
  editProperty(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((err) => {
      next(err)
    })
}

export const deleteSingle = (req: Request, res: Response, next: Errback) => {
  deleteProperty(req.params.id)
    .then(() => res.json({ message: 'Deleted' }))
    .catch((err) => {
      next(err)
    })
}
