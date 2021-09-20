import { createAsyncRouter } from '../util'
import { authRouter } from './auth'
import { userRouter } from './user'
import { errorsHandler } from './errorsHandler'

const rootRouter = createAsyncRouter()

rootRouter.use('/auth', authRouter)
rootRouter.use('/user', userRouter)

export { rootRouter, errorsHandler }
