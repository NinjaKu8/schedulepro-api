import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import HttpException from '../common/http-exception'
import { cleanBody } from '../common/cleanBody'
import { validateName, validateEmail, validatePassword } from '../services/root.service'

type JoinBody = {
  firstname: string
  middlename?: string
  lastname: string
  email: string
  password: string
}

export const cleanBodyJoin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cleanReqBody = cleanBody<JoinBody>(req.body, ['firstname', 'middlename', 'lastname', 'email', 'password'], (obj)=>{
      if(obj.firstname) validateName(obj.firstname)
      if(obj.middlename) validateName(obj.middlename)
      if(obj.lastname) validateName(obj.lastname)
      if(obj.email) validateEmail(obj.email)
      if(obj.password) validatePassword(obj.password)
    })
    if(!cleanReqBody) throw new HttpException(400, 'Invalid request body')
    req.body = cleanReqBody
    next()
  } catch (error) {
    next(error)
  }
}