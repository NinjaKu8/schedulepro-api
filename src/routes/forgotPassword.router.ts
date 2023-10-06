import express from 'express'

import * as forgotPasswordController from '../controllers/forgotPassword.controller'

const router = express.Router()

// forgotPassword uses the register model

router.route('/:email')
  .post(forgotPasswordController.create)

router.route('/:code')
  .get(forgotPasswordController.read)

export { router as default }