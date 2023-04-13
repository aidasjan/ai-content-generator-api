import { deleteContentsByCategory } from '../content'
import CategoryModel from './category.model'
import { type Category } from './types'

export const getAllCategories = async () => {
  const categories = await CategoryModel.find().populate('parent')
  const topLevelCategories = categories.filter((category) => !category.parent)

  const buildCategoryTree = (category) => {
    const subcategories = categories.filter((sub) =>
      sub.parent?._id.equals(category._id)
    )
    return { ...category._doc, subcategories }
  }

  return topLevelCategories.map((category) => buildCategoryTree(category))
}

export const getCategory = (id: string) => {
  return CategoryModel.findById(id)
}

export const addCategory = async (resultData: Category) => {
  const result = new CategoryModel(resultData)
  await result.save()
  return result
}

export const deleteCategory = async (id: string) => {
  const subcategories = await CategoryModel.find({ parent: id })
  if (subcategories.length > 0) {
    throw new Error('Cannot delete category that has subcategories')
  }
  await deleteContentsByCategory(id)
  return await CategoryModel.findByIdAndDelete(id)
}
