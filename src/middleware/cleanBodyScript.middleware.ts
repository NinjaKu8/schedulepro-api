import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import HttpException from '../common/http-exception'
import { IScript, scriptKeys } from '../models/script.model'
import { cleanBody } from '../common/cleanBody'

export const cleanBodyScript = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cleanReqBody = cleanBody<IScript>(req.body, scriptKeys)
    if(!cleanReqBody) throw new HttpException(400, 'Invalid request body')
    req.body = cleanReqBody
    next()
  } catch (error) {
    next(error)
  }
}