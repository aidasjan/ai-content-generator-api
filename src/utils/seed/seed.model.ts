import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  code: String
})

const SeedModel = mongoose.model('Seed', userSchema)

export default SeedModel
