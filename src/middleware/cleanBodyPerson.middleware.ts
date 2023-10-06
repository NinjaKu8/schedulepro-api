import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import HttpException from '../common/http-exception'
import { IPerson, personKeys } from '../models/person.model'
import { cleanBody } from '../common/cleanBody'
import { validateName, validateLength } from '../services/root.service'

export const cleanBodyPerson = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cleanReqBody = cleanBody<IPerson>(req.body, personKeys, (obj)=>{
      if(obj.firstname) validateName(obj.firstname)
      if(obj.middlename) validateName(obj.middlename)
      if(obj.lastname) validateName(obj.lastname)
      if(obj.position) validateLength(obj.position, 1, 50)
      if(obj.about) validateLength(obj.about, 1, 250)
    })
    if(!cleanReqBody) throw new HttpException(400, 'Invalid request body')
    req.body = cleanReqBody
    next()
  } catch (error) {
    next(error)
  }
}