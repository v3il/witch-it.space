import { createAsyncRouter } from '../util'
import { authRouter } from './auth'
import { userRouter } from './user'
import { profilesRouter } from './profiles'
import { errorsHandler } from './errorsHandler'

const rootRouter = createAsyncRouter()

rootRouter.use('/auth', authRouter)
rootRouter.use('/user', userRouter)
rootRouter.use('/profiles', profilesRouter)

export { rootRouter, errorsHandler }
