import { type ObjectId } from 'mongoose'

export interface Content {
  title: string
  content: string
  prompt: string
  isPublic: boolean
  user: ObjectId
}
