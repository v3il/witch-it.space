import { ItemsService, UsersService, WishlistService, PriceService } from './services'
import { wishlistItemFactory, priceFactory } from './factories'

export const itemsService = new ItemsService()
export const usersService = new UsersService()
export const priceService = new PriceService({ priceFactory })
export const wishlistService = new WishlistService({
    itemsService,
    wishlistItemFactory,
    priceService
})
