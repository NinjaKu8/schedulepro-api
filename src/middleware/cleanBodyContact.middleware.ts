import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import HttpException from '../common/http-exception'
import { IContact, contactKeys } from '../models/contact.model'
import { cleanBody } from '../common/cleanBody'

export const cleanBodyContact = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cleanReqBody = cleanBody<IContact>(req.body, contactKeys)
    if(!cleanReqBody) throw new HttpException(400, 'Invalid request body')
    req.body = cleanReqBody
    next()
  } catch (error) {
    next(error)
  }
}