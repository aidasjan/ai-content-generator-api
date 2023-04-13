import express, { type Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import { getJwtStrategy } from './utils/auth'
import appRouter from './routes'
import { connectToDb } from './utils/db'
import { errorHandler } from './utils/errors'
import { seedDb } from './utils/seed/seedRunner'

const main = async () => {
  dotenv.config()

  const app: Express = express()

  app.use(cors())
  app.use(express.json())

  await connectToDb()

  await seedDb()

  passport.use(getJwtStrategy())

  app.use('/api', appRouter)

  app.use(errorHandler)

  const port = process.env.PORT
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
  })
}

main().catch((e) => {
  console.error(e)
})
