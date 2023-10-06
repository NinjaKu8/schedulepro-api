import { NextFunction, Request, Response } from 'express'

import * as authService from '../services/auth.service'
import * as crudService from '../services/crud.service'
import * as emailService from '../services/email.service'
import { Register, IRegister } from '../models/register.model'
import { User, IUser } from '../models/user.model'
import { Person, IPerson } from '../models/person.model'
import HttpException from '../common/http-exception'
import { isValidEmail } from '../common/isValidEmail'
import { cookieOptions } from '../config/cookieOptions'

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = req.params.email
    if(!email || !isValidEmail(email)) throw new HttpException(400, 'You must provide a valid email address')
    // find user
    const user = await crudService.readByObj<IUser>(User, { email, isActive: true })
    const person = await crudService.readByObj<IPerson>(Person, { userId: user._id })
    // create register
    const register = await crudService.create<IRegister>(Register, { userId: user._id })
    // send email
    emailService.emailForgotPassword(req.t, person.firstname!, email, register.code)
    if(process.env.NODE_ENV==='production') {
      res
        .sendStatus(200)
    } else { // for testing
      res
        .status(200)
        .json({ code: register.code })
    }
  } catch(e) {
    next(e)
  }
}

export const read = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // get register by code
    const register = await crudService.readByObj<IRegister>(Register, { code: req.params.code })

    // get user
    const { user, roles } = await authService.authGetUserForgot(register.userId.toString())
    // authenticate
    const { accessToken, refreshToken } = await authService.authCreateTokens(user, roles)
    // handle old tokens
    await user.updateTokens([])
    // update user token
    await user.addToken(refreshToken)
    res.clearCookie('jwt')
    // update user token
    await user.addToken(refreshToken)

    // delete register
    await crudService.destroy<IRegister>(Register, register._id.toString())

    res
      .cookie('jwt', refreshToken, cookieOptions)
      .status(200)
      .json({ accessToken, user: user._id.toString() })
  } catch(e) {
    next(e)
  }
}
