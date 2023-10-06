import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import HttpException from '../common/http-exception'
import { Permission } from '../models/permission.model'
import { comparePermissionLevels } from '../common/comparePermissionLevels'
import { getValueFromHeaders } from '../common/getValueFromHeaders'

const headers: {[x:string]:string} = { // all collections that require permissions
  project: 'X-Project',
  script: 'X-Script',
  schedule: 'X-Schedule',
  schedDesign: 'X-SchedDesign',
  schedPalette: 'X-SchedPalette',
  design: 'X-Design',
}

/*
  * This middleware is used to check if the user has permission to access a document.
  * 
  * This middleware should be used after the credentials middleware.
  * 
  */
export const permission = (valueType: string, minimumLevel: string) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // find user id from req object
    const userId = req.userId
    if(!userId) throw new HttpException(406, 'User ID not included in reqest object')

    // find document id from headers
    const headerName: string = headers[valueType] // set header name based on valueType
    const documentId = getValueFromHeaders(req.headers, headerName)

    // find permission for user
    const permission = await Permission.findOne({ userId, documentId, valueType })
    if(!permission) throw new HttpException(401, 'You do not have permission to access this data')

    // check if user has high enough permission to access this document
    const hasPermissionLevel = comparePermissionLevels(permission.level, minimumLevel)
    if(!hasPermissionLevel) throw new HttpException(401, 'Your permission level is not high enough for this data')

    next()
  } catch (error) {
    next(error)
  }
}