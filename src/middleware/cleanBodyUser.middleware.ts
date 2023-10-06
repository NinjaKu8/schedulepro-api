import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import HttpException from '../common/http-exception'
import { IUser, userKeys } from '../models/user.model'
import { cleanBody } from '../common/cleanBody'
import { validateEmail } from '../services/root.service'

export const cleanBodyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userKeysWithoutPassword = _.without(userKeys, 'password','tokens','email','isActive','isRegistered')
    const cleanReqBody = cleanBody<IUser>(req.body, userKeysWithoutPassword, (obj)=>{
      if(obj.email) validateEmail(obj.email)
    })
    if(!cleanReqBody) throw new HttpException(400, 'Invalid request body')
    req.body = cleanReqBody
    next()
  } catch (error) {
    next(error)
  }
}