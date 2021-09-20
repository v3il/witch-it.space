import { userController } from '../controllers'
import { authorized } from '../interceptors'
import { createAsyncRouter } from '../util'

const userRouter = createAsyncRouter()

userRouter.get('/', authorized, userController.getCurrentUser)

export { userRouter }
