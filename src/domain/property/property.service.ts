import { deleteContentsByProperty } from '../content'
import PropertyModel from './property.model'
import { type Property } from './types'

export const getAllProperties = () => {
  return PropertyModel.find()
}

export const getManyProperties = (ids: string[]) => {
  return PropertyModel.find({ _id: { $in: ids } })
}

export const addProperty = async (resultData: Property) => {
  const result = new PropertyModel(resultData)
  await result.save()
  return result
}

export const deleteProperty = async (id: string) => {
  await deleteContentsByProperty(id)
  return await PropertyModel.findByIdAndDelete(id)
}
