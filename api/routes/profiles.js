import { profilesController } from '../controllers'
import { authorized } from '../interceptors'
import { createAsyncRouter } from '../util'

const profilesRouter = createAsyncRouter()

profilesRouter.get('/', authorized, profilesController.getProfiles)

export { profilesRouter }
