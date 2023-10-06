import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import HttpException from '../common/http-exception'

/*
  * This middleware is used to check if the user is accessing their own data.
  * 
  * This middleware should be used after the credentials middleware.
  * 
  */
export const isUserSelf = (key: string) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // find user id from req object
    const userId = req.userId
    if(!userId) throw new HttpException(406, 'User ID not included in reqest object')
    // check if userId matches object.key
    if(_.isArray(req.body)) { // if is array of objects
      req.body.forEach((obj: any) => {
        if(obj[key]!==userId) throw new HttpException(403, 'User does not have permission to access this resource')
      })
    } else { // else is single object
      if(req.body[key]!==userId) throw new HttpException(403, 'User does not have permission to access this resource')
    }
    next()
  } catch (error) {
    next(error)
  }
}