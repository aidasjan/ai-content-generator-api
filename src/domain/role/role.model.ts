import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  code: String,
  name: String
})

const RoleModel = mongoose.model('Role', userSchema)

export default RoleModel
