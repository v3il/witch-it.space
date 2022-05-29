import { ItemsService, UsersService, WishlistService, PriceService, QuestsService } from './services'
import { wishlistItemFactory, priceFactory } from './factories'

export const itemsService = new ItemsService()
export const usersService = new UsersService()
export const questsService = new QuestsService()
export const priceService = new PriceService({ priceFactory })
export const wishlistService = new WishlistService({
    itemsService,
    wishlistItemFactory,
    priceService
})
