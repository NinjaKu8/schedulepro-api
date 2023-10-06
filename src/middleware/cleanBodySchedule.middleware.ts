import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import HttpException from '../common/http-exception'
import { ISchedule, scheduleKeys } from '../models/schedule.model'
import { cleanBody } from '../common/cleanBody'

export const cleanBodySchedule = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cleanReqBody = cleanBody<ISchedule>(req.body, scheduleKeys)
    if(!cleanReqBody) throw new HttpException(400, 'Invalid request body')
    req.body = cleanReqBody
    next()
  } catch (error) {
    next(error)
  }
}