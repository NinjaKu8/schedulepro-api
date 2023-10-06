import { NextFunction, Request, Response } from 'express'

import * as authService from '../services/auth.service'
import * as crudService from '../services/crud.service'
import * as emailService from '../services/email.service'
import { Register, IRegister } from '../models/register.model'
import { User, IUser } from '../models/user.model'
import { Person, IPerson } from '../models/person.model'
import { cookieOptions } from '../config/cookieOptions'

export const read = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // get register by code
    const register = await crudService.readByObj<IRegister>(Register, { code: req.params.code })

    // get user
    const { user, roles } = await authService.authGetUserJoin(register.userId.toString())
    // update user
    await crudService.update<IUser>(User, register.userId.toString(), { isActive: true, isRegistered: true })
    // authenticate
    const { accessToken, refreshToken } = await authService.authCreateTokens(user, roles)
    // update user token
    await user.addToken(refreshToken)

    // delete register
    await crudService.destroy<IRegister>(Register, register._id.toString())

    // send email
    const person = await crudService.readByObj<IPerson>(Person, { userId: user._id })
    emailService.emailWelcome(req.t, person.firstname!, user.email)
    
    res
      .cookie('jwt', refreshToken, cookieOptions)
      .status(200)
      .json({ accessToken, user: user._id.toString() })
  } catch(e) {
    next(e)
  }
}
