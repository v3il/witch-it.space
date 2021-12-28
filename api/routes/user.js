import { userController } from '../controllers'
import { authorized } from '../interceptors'
import { createAsyncRouter } from '../util'

const userRouter = createAsyncRouter()

userRouter.get('/', authorized, userController.getCurrentUser)
userRouter.get('/:id', authorized, userController.getById)
userRouter.post('/locale', authorized, userController.changeUserLocale)
userRouter.post('/theme', authorized, userController.changeUserTheme)
userRouter.post('/disconnect', authorized, userController.disconnectSocial)
userRouter.post('/settings', authorized, userController.updateSettings)
userRouter.post('/toggle', authorized, userController.toggleProfile)
userRouter.post('/remove', authorized, userController.removeProfile)

export { userRouter }
