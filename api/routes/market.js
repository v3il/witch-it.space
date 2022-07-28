import { marketController } from '../controllers'
import { authorized } from '../interceptors'
import { createAsyncRouter } from '../util'

const marketRouter = createAsyncRouter()

marketRouter.get('/', /* authorized, */ marketController.getUserOffers)
marketRouter.post('/create', authorized, marketController.massCreate)
marketRouter.post('/update', authorized, marketController.massUpdate)
marketRouter.post('/remove', authorized, marketController.massRemove)

export { marketRouter }
