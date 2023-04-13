import mongoose from 'mongoose'

export const connectToDb = async () => {
  const dbConnString = process.env.DB_CONNECTION_STRING
  if (!dbConnString) {
    return
  }
  await mongoose.connect(dbConnString)
}
