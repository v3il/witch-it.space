import { wishlistController } from '../controllers'
import { authorized } from '../interceptors'
import { createAsyncRouter } from '../util'

const wishlistRouter = createAsyncRouter()

wishlistRouter.get('/', authorized, wishlistController.getUserWishlist)
wishlistRouter.post('/mass_create', authorized, wishlistController.massCreate)
wishlistRouter.post('/mass_update', authorized, wishlistController.massUpdate)
wishlistRouter.post('/remove', authorized, wishlistController.removeFromWishlist)

export { wishlistRouter }
