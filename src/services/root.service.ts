
import { User } from '../models/user.model'
import { isValidEmail } from '../common/isValidEmail'
import { isValidPassword } from '../common/isValidPassword'
import { isValidName } from '../common/isValidName'
import HttpException from '../common/http-exception'
import { Types } from 'mongoose'

type ServerStatus = {
  name: string|undefined,
  version: string|undefined,
  status: string,
  timestamp: string
}

export const serverStatus = async (): Promise<ServerStatus> => {
  const status = 'online' // TODO: check db connection
  return {
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
    status,
    timestamp: new Date().toISOString()
  }
}

export const doesUserEmailExist = async (email: string): Promise<boolean> => {
  if(!email) throw new HttpException(400, 'You must provide a valid email address')
  const user = await User.findOne({ email: email.toLowerCase() })
  return !!user
}

export const emailDuplicateCheck = async (email: string): Promise<void> => {
  const exists = await doesUserEmailExist(email)
  if(exists) throw new HttpException(409, 'Email address already in use by another user')
}

export const validateLength = (value: string, min: number = 1, max: number = 10000): void => {
  if(value.length < min || value.length > max) throw new HttpException(400, 'Value has an invalid length')
}

export const validateName = (name: string, required: boolean = false): void => {
  if(required && !name?.length) throw new HttpException(400, 'Missing required field')
  validateLength(name, 1, 35)
  if(!isValidName(name)) throw new HttpException(400, 'Names cannot contain special characters')
}

export const validateEmail = (email: string): void => {
  if(!email) throw new HttpException(400, 'Email is required')
  if(!isValidEmail(email)) throw new HttpException(400, 'You must provide a valid email address')
}

export const validatePassword = (password: string): void => {
  if(!password) throw new HttpException(400, 'Password is required')
  validateLength(password, 6, 20)
  if(!isValidPassword(password)) throw new HttpException(400, 'Passwords cannot contain special characters')
}