import { Request, Response, NextFunction } from 'express'

import HttpException from '../common/http-exception'

/*
  * This middleware is used to verify user roles.
  *
  */
export const verifyRoles = (...allowedRoles: number[]) => (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req?.roles) throw new HttpException(401, 'Request must include role')
    const rolesArray = [...allowedRoles]
    const result = req.roles.map(role=>rolesArray.includes(role)).find(value=>value===true)
    if(!result) throw new HttpException(401, 'User does not have approripate role')
    next()
  } catch (error) {
    next(error)
  }  
}