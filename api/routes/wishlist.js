import { wishlistController } from '../controllers'
import { authorized } from '../interceptors'
import { createAsyncRouter } from '../util'

const wishlistRouter = createAsyncRouter()

wishlistRouter.get('/', authorized, wishlistController.getUserWishlist)
wishlistRouter.post('/manage', authorized, wishlistController.manage)
wishlistRouter.post('/remove', authorized, wishlistController.removeFromWishlist)
// wishlistRouter.post('/edit', authorized, wishlistController.editWishlistItem)
// wishlistRouter.get('/check', authorized, wishlistController.isWishlistedItem)

export { wishlistRouter }
