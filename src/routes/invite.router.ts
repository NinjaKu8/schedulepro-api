import express from 'express'

import * as inviteController from '../controllers/invite.controller'
import { cleanBodyJoin } from '../middleware'

const router = express.Router()

// note invite creation is handled by user.router.ts

router.route('/:code') // user has an invite code, get the invite. This step gets them to the join page
  .get(inviteController.read)

router.route('/join/:code') // user has an invite code, is now joining
  .post(cleanBodyJoin, inviteController.join)

export { router as default }