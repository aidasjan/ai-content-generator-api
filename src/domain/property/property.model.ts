import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  title: String,
  isHighlighted: Boolean
})

const PropertyModel = mongoose.model('Property', userSchema)

export default PropertyModel
