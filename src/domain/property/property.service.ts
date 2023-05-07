import { deleteContentsByProperty } from '../content'
import PropertyModel from './property.model'
import { type Property } from './types'

export const getAllProperties = () => {
  return PropertyModel.find()
}

export const getManyProperties = (ids: string[]) => {
  return PropertyModel.find({ _id: { $in: ids } })
}

export const addProperty = async (data: Property) => {
  const result = new PropertyModel(data)
  await result.save()
  return result
}

export const editProperty = async (id: string, data: Property) => {
  return await PropertyModel.findByIdAndUpdate(id, { title: data.title })
}

export const deleteProperty = async (id: string) => {
  await deleteContentsByProperty(id)
  return await PropertyModel.findByIdAndDelete(id)
}
