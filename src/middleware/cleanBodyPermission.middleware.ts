import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import HttpException from '../common/http-exception'
import { IPermission, permissionKeys } from '../models/permission.model'
import { cleanBody } from '../common/cleanBody'
import { permissionsList } from '../config/permissionsList'

export const cleanBodyPermission = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cleanReqBody = cleanBody<IPermission>(req.body, permissionKeys, (obj)=>{
      if(!obj.userId || !obj.documentId || !obj.valueType || !obj.level) throw new HttpException(400, 'Missing required field')
      if(obj.level && !permissionsList.includes(obj.level)) throw new HttpException(400, 'Permission level is invalid')
    })
    if(!cleanReqBody) throw new HttpException(400, 'Invalid request body')
    req.body = cleanReqBody
    next()
  } catch (error) {
    next(error)
  }
}