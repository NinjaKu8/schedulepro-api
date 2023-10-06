import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'

import * as authService from '../services/auth.service'
import * as crudService from '../services/crud.service'
import * as emailService from '../services/email.service'
import * as rootService from '../services/root.service'
import * as userService from '../services/user.service'
import { User, IUser } from '../models/user.model'
import { Register, IRegister } from '../models/register.model'
import HttpException from '../common/http-exception'

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { user, person } = await userService.join(req.body)
    const register = await crudService.create<IRegister>(Register, { userId: user._id })
    // send email
    emailService.emailRegister(req.t, person.firstname!, user.email, register.code)
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
    const document = await crudService.read<IUser>(User, req.userId!)
    const simpleUser = _.omit(document.toObject(), ['password','tokens','email'])
    res
      .status(200)
      .json(simpleUser)
  } catch(e) {
    next(e)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const document = await crudService.update<IUser>(User, req.userId!, req.body)
    const simpleUser = _.omit(document.toObject(), ['password','tokens','email'])
    res
      .status(200)
      .json(simpleUser)
  } catch(e) {
    next(e)
  }
}

export const passwordReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { passwordOld, passwordNew } = req.body
    console.log("🚀 ~ file: user.controller.ts:59 ~ passwordReset ~ passwordOld:", passwordOld)
    console.log("🚀 ~ file: user.controller.ts:59 ~ passwordReset ~ passwordNew:", passwordNew)
    if(!passwordOld || !passwordNew) throw new HttpException(400, 'Missing required field')
    // validate
    rootService.validatePassword(passwordOld)
    rootService.validatePassword(passwordNew)
    console.log('password')
    // get user
    const user = await User.findOne({ _id: req.userId }, { password: 1 })
    if(!user) throw new HttpException(404, 'User not found')
    // make sure the old password is correct
    const match = await authService.authComparePasswords(passwordOld, user.password)
    console.log("🚀 ~ file: user.controller.ts:70 ~ passwordReset ~ match:", match)
    // update password
    user.password = passwordNew
    await user.save()
    res
      .sendStatus(201)
  } catch(e) {
    next(e)
  }
}
