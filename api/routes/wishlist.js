import { wishlistController } from '../controllers'
import { authorized } from '../interceptors'
import { createAsyncRouter } from '../util'

const wishlistRouter = createAsyncRouter()

wishlistRouter.get('/', authorized, wishlistController.getUserOffers)
wishlistRouter.post('/create', authorized, wishlistController.massCreate)
wishlistRouter.post('/update', authorized, wishlistController.massUpdate)
wishlistRouter.post('/remove', authorized, wishlistController.massRemove)

export { wishlistRouter }
