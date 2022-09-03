import { userController } from '../controllers'
import { authorized, fetchUser } from '../interceptors'
import { createAsyncRouter } from '../util'

const userRouter = createAsyncRouter()

userRouter.get('/', fetchUser, userController.getCurrentUser)
userRouter.get('/:id', authorized, userController.getById)
userRouter.post('/locale', authorized, userController.changeUserLocale)
userRouter.post('/theme', authorized, userController.changeUserTheme)
userRouter.post('/disconnect', authorized, userController.disconnectSocial)
userRouter.post('/settings', authorized, userController.updateSettings)
userRouter.post('/settings/account', authorized, userController.updateAccountSettings)
userRouter.post('/settings/security', authorized, userController.updateSecuritySettings)
userRouter.post('/toggle', authorized, userController.toggleProfile)
userRouter.post('/remove', authorized, userController.removeProfile)

export { userRouter }
