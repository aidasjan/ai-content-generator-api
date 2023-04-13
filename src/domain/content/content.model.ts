import mongoose, { Schema } from 'mongoose'

const contentSchema = new mongoose.Schema({
  title: String,
  content: String,
  prompt: String,
  isSaved: Boolean,
  isPublic: Boolean,
  keywords: [String],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
  createdAt: { type: Date, default: Date.now }
})

const ContentModel = mongoose.model('Content', contentSchema)

export default ContentModel
