import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import HttpException from '../common/http-exception'
import { IAlert, alertKeys } from '../models/alert.model'
import { cleanBody } from '../common/cleanBody'

export const cleanBodyAlert = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cleanReqBody = cleanBody<IAlert>(req.body, alertKeys)
    if(!cleanReqBody) throw new HttpException(400, 'Invalid request body')
    req.body = cleanReqBody
    next()
  } catch (error) {
    next(error)
  }
}