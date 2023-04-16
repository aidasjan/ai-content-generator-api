import jwt from 'jsonwebtoken'
import { type User } from './types'
import UserModel from './user.model'
import bcrypt from 'bcrypt'
import { getRoleByCode } from '../role/role.service'
import { type Role } from '../role/types'
import { deleteContentsByUser } from '../content'
import { HttpError } from '../../utils/errors'

const findUserByEmail = (email: string) => {
  return UserModel.findOne({ email }).populate('role')
}

const checkRegistrationWhitelist = (
  email: string,
  registrationWhitelist: string
) => {
  const whitelistArr = registrationWhitelist.split(',')
  for (let i = 0; i < whitelistArr.length; i++) {
    if (whitelistArr[i].startsWith('*')) {
      const endOfString = whitelistArr[i].substring(1)
      if (email.endsWith(endOfString)) {
        return true
      }
    } else {
      if (email === whitelistArr[i].trim()) {
        return true
      }
    }
  }
  return false
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
  const registrationWhitelist = process.env.REGISTRATION_WHITELIST
  if (registrationWhitelist) {
    const isAllowed = checkRegistrationWhitelist(
      userData.email,
      registrationWhitelist
    )
    if (!isAllowed) {
      throw new HttpError(
        'This user is not allowed to register. Contact the developer of this application if you think this is an issue.',
        400
      )
    }
  }

  const existingUser = await UserModel.findOne({ email: userData.email })
  if (existingUser) {
    throw new HttpError('Cannot register this user', 400)
  }

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
