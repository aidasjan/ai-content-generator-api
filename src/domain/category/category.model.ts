import mongoose, { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
  title: String,
  parent: { type: Schema.Types.ObjectId, ref: 'Category' },
  createdAt: { type: Date, default: Date.now }
})

const CategoryModel = mongoose.model('Category', userSchema)

export default CategoryModel
