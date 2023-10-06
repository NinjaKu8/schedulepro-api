import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

import HttpException from '../common/http-exception'

/*
  * This middleware is used to verify a JWT.
  *
  */
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!process.env.ACCESS_TOKEN_SECRET) throw new Error('No access token secret found')
    const authHeader = req.headers.authorization || req.headers.Authorization
    if((!_.isArray(authHeader) && !authHeader?.startsWith('Bearer ')) || _.isArray(authHeader) ) throw new HttpException(401, 'User not authorized')
    const token = authHeader.split(' ')[1]
    jwt.verify(
      token, 
      process.env.ACCESS_TOKEN_SECRET, 
      (err, decoded) => {
        if(err || !decoded || typeof decoded === 'string') throw new HttpException(403, 'User is forbidden')
        req.userId = decoded.userInfo._id
        req.roles = decoded.userInfo.roles
        next()
      }
    )
  } catch (error) {
    next(error)
  }
  
}