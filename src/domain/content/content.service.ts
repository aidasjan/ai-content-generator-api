import { generateContent } from '../../services/openAi'
import { getCategory } from '../category'
import { generatePrompt } from '../prompt'
import { getManyProperties } from '../property'
import ContentModel from './content.model'

export const getContent = (id: string) => {
  return ContentModel.findById(id)
    .populate('user')
    .populate('category')
    .populate('properties')
}

export const getPublicContents = () => {
  return ContentModel.find({ isPublic: true })
    .populate('user')
    .populate('category')
    .populate('properties')
}

export const getUserContents = async (userId: string | undefined) => {
  if (!userId) {
    return null
  }
  return await ContentModel.find({ user: userId, isSaved: true }).populate(
    'category'
  )
}

export const publishContent = async (id: string, title: string) => {
  const existingContent = await ContentModel.findById(id)
  if (existingContent) {
    existingContent.title = title
    existingContent.isSaved = true
    existingContent.isPublic = true
    await existingContent.save()
    return existingContent
  }
  return null
}

export const saveContent = async (id: string) => {
  const existingContent = await ContentModel.findById(id)
  if (existingContent) {
    existingContent.isSaved = true
    await existingContent.save()
    return existingContent
  }
  return null
}

export const softDeleteContent = async (id: string) => {
  const existingContent = await ContentModel.findById(id)
  if (existingContent){
    existingContent.isSaved = false
    existingContent.isPublic = false
    await existingContent.save()
    return existingContent
  }
  return null
}

export const deleteContentsByCategory = (id: string) => {
  return ContentModel.deleteMany({ category: id })
}

export const deleteContentsByUser = (id: string) => {
  return ContentModel.deleteMany({ user: id })
}

export const deleteContentsByProperty = (id: string) => {
  return ContentModel.deleteMany({ properties: id })
}

export const createContent = async (
  categoryId: string,
  propertyIds: string[],
  keywords: string[],
  user?: Express.User
) => {
  const category = await getCategory(categoryId)
  const properties = await getManyProperties(propertyIds)
  const trimmedKeywords = keywords.map((keyword) => keyword.trim())

  if (!category?.title || !properties || !user) {
    return null
  }

  const propertyStrings = properties
    .map((p) => p.title ?? '')
    .filter((p) => p !== '')

  const prompt = await generatePrompt(
    category.title,
    propertyStrings,
    trimmedKeywords
  )

  if (!prompt) {
    return null
  }

  const generatedContentValue = await generateContent(prompt)
  const newContent = new ContentModel({
    content: generatedContentValue,
    properties,
    category,
    user: user.id,
    keywords: trimmedKeywords,
    prompt,
    isSaved: false,
    isPublic: false
  })
  newContent.save()
  return newContent
}
