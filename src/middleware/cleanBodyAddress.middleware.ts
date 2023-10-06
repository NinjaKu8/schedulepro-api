import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import HttpException from '../common/http-exception'
import { IAddress, addressKeys } from '../models/address.model'
import { cleanBody } from '../common/cleanBody'

export const cleanBodyAddress = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cleanReqBody = cleanBody<IAddress>(req.body, addressKeys)
    if(!cleanReqBody) throw new HttpException(400, 'Invalid request body')
    req.body = cleanReqBody
    next()
  } catch (error) {
    next(error)
  }
}