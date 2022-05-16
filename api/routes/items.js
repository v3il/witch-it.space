import { itemsController } from '../controllers'
import { authorized } from '../interceptors'
import { createAsyncRouter } from '../util'

const itemsRouter = createAsyncRouter()

itemsRouter.get('/', /* authorized, */ itemsController.getItems)

export { itemsRouter }
