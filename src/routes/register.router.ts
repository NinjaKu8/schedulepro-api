import express from 'express'

import * as userController from '../controllers/user.controller'
import { cleanBodyJoin } from '../middleware'
import * as registerController from '../controllers/register.controller'

const router = express.Router()

router.route('/')
  .post(cleanBodyJoin, userController.create) // handles create user, person, contact and register

router.route('/:code')
  .get(registerController.read) // handles register, returns auth

export { router as default }