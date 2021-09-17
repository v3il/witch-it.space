import express from 'express'
import { userController } from '../controllers'
import { authorized } from '../interceptors'

const userRouter = express.Router()

userRouter.get('/', authorized, userController.getCurrentUser)

export { userRouter }
