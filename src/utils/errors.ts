import { type Errback, type Request, type Response } from 'express'

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: Errback
) => {
  console.log(`[error]: ${err.message}, ${err.stack}`)
  const status = err.status || 500
  res.status(status).send({ error: err.message })
}

export class HttpError extends Error {
  status: Number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}
