import { globalController } from '../controllers'
import { createAsyncRouter } from '../util'

const globalDataRouter = createAsyncRouter()

globalDataRouter.get('/', globalController.loadGlobalData)

export { globalDataRouter }
