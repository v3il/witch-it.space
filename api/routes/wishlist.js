import { wishlistController } from '../controllers'
import { authorized } from '../interceptors'
import { createAsyncRouter } from '../util'

const wishlistRouter = createAsyncRouter()

wishlistRouter.get('/', authorized, wishlistController.getUserWishlist)
wishlistRouter.post('/manage', authorized, wishlistController.addToWishlist)
wishlistRouter.post('/edit', authorized, wishlistController.editWishlistItem)
wishlistRouter.post('/remove', authorized, wishlistController.removeFromWishlist)
wishlistRouter.get('/check', authorized, wishlistController.isWishlistedItem)

export { wishlistRouter }
