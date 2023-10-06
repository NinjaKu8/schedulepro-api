import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import HttpException from '../common/http-exception'
import { isValidEmail } from '../common/isValidEmail'

export const cleanBodyInvite = (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req.body.emails) throw new HttpException(400, 'Invalid request body')
    req.body.emails = req.body.emails.filter((email: string) => isValidEmail(email)) // filter out invalid emails
    next()
  } catch (error) {
    next(error)
  }
}