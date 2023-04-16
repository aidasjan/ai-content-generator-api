import { type Errback, type Request, type Response } from 'express'
import {
  getContent,
  getPublicContents,
  getUserContents,
  publishContent,
  softDeleteContent,
  createContent,
  saveContent
} from './content.service'

export const getSingle = (req: Request, res: Response, next: Errback) => {
  getContent(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => {
      next(err)
    })
}

export const getAllPublic = (req: Request, res: Response, next: Errback) => {
  getPublicContents()
    .then((users) => res.json(users))
    .catch((err) => {
      next(err)
    })
}

export const getAllByUser = (req: Request, res: Response, next: Errback) => {
  getUserContents(req.user?.id)
    .then((result) => res.json(result))
    .catch((err) => {
      next(err)
    })
}

export const publish = (req: Request, res: Response, next: Errback) => {
  publishContent(req.params.id, req.body.title)
    .then((result) => res.json(result))
    .catch((err) => {
      next(err)
    })
}

export const save = (req: Request, res: Response, next: Errback) => {
  saveContent(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => {
      next(err)
    })
}

export const deleteSingle = (req: Request, res: Response, next: Errback) => {
  softDeleteContent(req.params.id)
    .then(() => res.json({ message: 'Deleted' }))
    .catch((err) => {
      next(err)
    })
}

export const create = (req: Request, res: Response, next: Errback) => {
  createContent(
    req.body.category,
    req.body.properties,
    req.body.keywords,
    req.user
  )
    .then((result) => res.json({ result }))
    .catch((err) => {
      next(err)
    })
}
