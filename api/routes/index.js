import { Router } from 'express'

import { authRouter } from './auth'
import { userRouter } from './user'
import { errorsHandler } from './errorsHandler'

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/user', userRouter)

export { rootRouter, errorsHandler }
