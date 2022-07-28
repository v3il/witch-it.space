import { profilesController } from '../controllers'
import { createAsyncRouter } from '../util'

const profilesRouter = createAsyncRouter()

profilesRouter.get('/', profilesController.getProfiles)

export { profilesRouter }
