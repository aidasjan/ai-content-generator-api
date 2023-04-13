import mongoose, { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  results: [{ type: Schema.Types.ObjectId, ref: 'Result' }],
  createdAt: { type: Date, default: Date.now }
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
