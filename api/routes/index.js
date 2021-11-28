import { createAsyncRouter } from '../util'
import { authRouter } from './auth'
import { userRouter } from './user'
import { profilesRouter } from './profiles'
import { questsRouter } from './quests'
import { itemsRouter } from './items'
import { errorsHandler } from './errorsHandler'

const rootRouter = createAsyncRouter()

rootRouter.use('/auth', authRouter)
rootRouter.use('/user', userRouter)
rootRouter.use('/profiles', profilesRouter)
rootRouter.use('/quests', questsRouter)
rootRouter.use('/items', itemsRouter)
rootRouter.use('/wishlist', itemsRouter)

export { rootRouter, errorsHandler }
