import { NextFunction, Request, Response } from 'express'

import * as emailService from '../services/email.service'

export const emailRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    emailService.emailRegister(req.t, 'Firstname', 'modemmute@hotmail.com', 'codeABC123')
    res
      .sendStatus(200)
  } catch(e) {
    next(e)
  }
}

export const emailWelcome = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    emailService.emailWelcome(req.t, 'Firstname', 'modemmute@hotmail.com')
    res
      .sendStatus(200)
  } catch(e) {
    next(e)
  }
}

export const emailForgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    emailService.emailForgotPassword(req.t, 'Firstname', 'modemmute@hotmail.com', 'codeABC123')
    res
      .sendStatus(200)
  } catch(e) {
    next(e)
  }
}

export const emailInvite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    emailService.emailInvite(req.t, 'Full Name', 'modemmute@hotmail.com', 'codeABC123', 'Project Name')
    res
      .sendStatus(200)
  } catch(e) {
    next(e)
  }
}

export const emailNotify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    emailService.emailNotify(req.t, 'modemmute@hotmail.com', req.t('This is my message'))
    res
      .sendStatus(200)
  } catch(e) {
    next(e)
  }
}

export const emailSubscribed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    emailService.emailSubscribed(req.t, 'Firstname', 'modemmute@hotmail.com', req.t('This is my message'))
    res
      .sendStatus(200)
  } catch(e) {
    next(e)
  }
}

export const emailFarewell = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    emailService.emailFarewell(req.t, 'Firstname', 'modemmute@hotmail.com')
    res
      .sendStatus(200)
  } catch(e) {
    next(e)
  }
}
