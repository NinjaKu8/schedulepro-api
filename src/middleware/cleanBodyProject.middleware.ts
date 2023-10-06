import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import HttpException from '../common/http-exception'
import { IProject, projectKeys } from '../models/project.model'
import { cleanBody } from '../common/cleanBody'
import { validateName, validateLength } from '../services/root.service'

export const cleanBodyProject = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cleanReqBody = cleanBody<IProject>(req.body, projectKeys, (obj)=>{
      if(obj.name) validateName(obj.name)
      if(obj.description) validateLength(obj.description, 1, 250)
    })
    if(!cleanReqBody) throw new HttpException(400, 'Invalid request body')
    req.body = cleanReqBody
    next()
  } catch (error) {
    next(error)
  }
}