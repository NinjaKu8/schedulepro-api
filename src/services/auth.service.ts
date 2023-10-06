import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User, IUser, IUserMethods } from '../models/user.model'
import HttpException from '../common/http-exception'
import { tokenCreateAccess } from '../common/tokenCreateAccess'
import { tokenCreateRefresh } from '../common/tokenCreateRefresh'

export const authCreateTokens = async (user: IUser & IUserMethods, roles: number[]) => {
  // create tokens
  const accessToken = tokenCreateAccess(user._id.toString(), roles)
  const refreshToken = tokenCreateRefresh(user._id.toString(), roles)
  return { accessToken, refreshToken }
}

export const authGetUserLogin = async(email: string) => {
  const user = await User.findOne({ email, isActive: true },{ password: 1, roles: 1, tokens: 1 })
  if(!user) throw new HttpException(404, 'User not found')
  const roles = user.roles.map(role=>role.code)
  return { user, roles }
}

export const authGetUserJoin = async(_id: string) => {
  const user = await User.findOne({ _id, isActive: false },{ password: 1, roles: 1, tokens: 1 })
  if(!user) throw new HttpException(404, 'User not found')
  const roles = user.roles.map(role=>role.code)
  return { user, roles }
}

export const authGetUserForgot = async(_id: string) => {
  const user = await User.findOne({ _id, isActive: true },{ password: 1, roles: 1, tokens: 1 })
  if(!user) throw new HttpException(404, 'User not found')
  const roles = user.roles.map(role=>role.code)
  return { user, roles }
}

export const authGetUserByToken = async(refreshToken: string) => {
  if(!process.env.REFRESH_TOKEN_SECRET) throw new Error('No refresh token secret found')
  if(!refreshToken) throw new HttpException(400, 'Token is required')
  const user = await User.findOne({ tokens: refreshToken, isActive: true }, { roles: 1, tokens: 1 })
  if(!user) {
    jwt.verify( 
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if(err || !decoded || typeof decoded === 'string' || !decoded.userInfo?._id) throw new HttpException(403, 'User is forbidden')
        // attempted refresh token reuse!
        const hackedUser = await User.findOne({ _id: decoded.userInfo._id }, { tokens: 1 })
        if(!hackedUser) throw new HttpException(404, 'User not found')
        hackedUser.updateTokens([])
      }
    )
    throw new HttpException(403, 'User is forbidden')
  }
  const roles = user.roles.map(role=>role.code)
  return { user, roles }
}

export const authGetRefreshTokenFromCookies = (cookies: any): string => {
  if(!cookies) throw new HttpException(401, 'Cookie is required')
  if(!cookies?.jwt) throw new HttpException(404, 'Cookie does not contain a token')
  return cookies.jwt
}

export const authVerify = async (refreshToken: string, user: (IUser & IUserMethods)): Promise<void> => {
  if(!process.env.REFRESH_TOKEN_SECRET) throw new Error('No refresh token secret found')
  if(!refreshToken) throw new HttpException(400, 'Refresh token is required')
  if(!user) throw new HttpException(400, 'User is required')
  return jwt.verify( 
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if(err) await user.removeToken(refreshToken) // expired refreshToken
      if(err || !decoded || typeof decoded === 'string' || user._id.toString()!==decoded?.userInfo?._id) throw new HttpException(403, 'User is forbidden')
    }
  )
}

export const authComparePasswords = async (password1: string, password2: string): Promise<boolean> => {
  if(!password1 || !password2) throw new HttpException(400, 'Password is required and must be between 6 - 20 characters')
  const match = await bcrypt.compare(password1, password2)
  if(!match) throw new HttpException(401, 'User not authorized')
  return match
}

export const authRemoveOldTokens = async (user: (IUser & IUserMethods), jwt: any): Promise<boolean> => {
  if(jwt) {
    if(!user.tokens?.includes(jwt)) await user.updateTokens([]) // potential stolen token, reset all tokens
    await user.removeToken(jwt)
    return true
  }
  return false
}