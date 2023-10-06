import { NextFunction, Request, Response } from 'express'

import * as authService from '../services/auth.service'
import * as crudService from '../services/crud.service'
import * as userService from '../services/user.service'
import * as inviteService from '../services/invite.service'
import * as emailService from '../services/email.service'
import { Invite, IInvite } from '../models/invite.model'
import { getValueFromHeaders } from '../common/getValueFromHeaders'
import { createObjectId } from '../common/createObjectId'
import { cookieOptions } from '../config/cookieOptions'

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { emails } = req.body
    const headerId = getValueFromHeaders(req.headers, 'X-Project')
    const projectId = createObjectId(headerId)
    const userFromId = createObjectId(req.userId) // middleware.verifyJWT ensures this exists
    
    // create invites for each email address
    emails.forEach(async (email: string) => {
      inviteService.handleInviteUserByEmail(req.t, email.toLowerCase(), userFromId, projectId)
    })

    res
      .sendStatus(201)
  } catch(e) {
    next(e)
  }
}

export const read = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const code = req.params.code
    // get invite by code
    await crudService.readByObj<IInvite>(Invite, { code })

    res
      .sendStatus(200)
  } catch(e) {
    next(e)
  }
}

export const join = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const code = req.params.code
    // get invite by code
    const invite = await crudService.readByObj<IInvite>(Invite, { code })
    // create new account
    const { user: newUser, person } = await userService.join(req.body)

    // get user
    const { user, roles } = await authService.authGetUserJoin(newUser._id.toString())
    // authenticate
    const { accessToken, refreshToken } = await authService.authCreateTokens(user, roles)
    // update user token
    await user.addToken(refreshToken)
    // update user token
    await user.addToken(refreshToken)

    // join any invited projects, get an array of users to notify that someone just joined thier projects
    const userProjects = await inviteService.joinInvitedProjects(user, invite)

    // send welcome email
    emailService.emailWelcome(req.t, person.firstname!, user.email)

    // notify sending users
    userProjects.forEach(async (userProject: inviteService.UserProject) => {
      emailService.emailNotify(
        req.t, 
        userProject.email, 
        `${req.t('Your invite to')} ${person.firstname} ${person.lastname} (${user.email}) ${req.t('to join')} ${userProject.projectNames.join(', ')} ${req.t('has been accepted')}.`
      )
    })

    // delete invite
    await crudService.destroy<IInvite>(Invite, invite._id.toString())

    // TODO: socket - send permissions to existing users
    // TODO: socket - send alerts to inviting users

    res
      .cookie('jwt', refreshToken, cookieOptions)
      .status(200)
      .json({ accessToken, user: user._id.toString() })
  } catch(e) {
    next(e)
  }
}
