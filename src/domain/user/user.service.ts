import jwt from 'jsonwebtoken'
import { type User } from './types'
import UserModel from './user.model'
import bcrypt from 'bcrypt'
import { getRoleByCode } from '../role/role.service'
import { type Role } from '../role/types'
import { deleteContentsByUser } from '../content'

const findUserByEmail = (email: string) => {
  return UserModel.findOne({ email }).populate('role')
}

export const getAllUsers = () => {
  return UserModel.find().populate('role')
}

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email)

  if (!user?.password || !user?.role) {
    return null
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  const jwtSecret = process.env.JWT_SECRET
  const jwtValidityMinutes = process.env.JWT_VALIDITY_MINUTES

  if (!passwordMatch || !jwtSecret || !jwtValidityMinutes) {
    return null
  }

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * parseFloat(jwtValidityMinutes),
      sub: user._id
    },
    jwtSecret
  )

  return {
    name: user.name,
    email: user.email,
    role: (user.role as any as Role).code,
    token
  }
}

export const registerUser = async (userData: User, password: string) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const role = await getRoleByCode('user')

  const user = new UserModel({
    ...userData,
    role,
    password: hashedPassword
  })

  await user.save()
}

export const deleteUser = async (id: string) => {
  await deleteContentsByUser(id)
  return await UserModel.findByIdAndDelete(id)
}
