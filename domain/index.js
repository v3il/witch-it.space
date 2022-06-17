import { ItemsService, UsersService, OffersService, PriceService, QuestsService, LocalStorageService } from './services'
import { wishlistItemFactory, priceFactory } from './factories'
import { OfferTypes } from '@/shared/index.js'

export const itemsService = new ItemsService()
export const usersService = new UsersService()
export const questsService = new QuestsService()
export const localStorageService = new LocalStorageService(process.client ? window.localStorage : null)
export const priceService = new PriceService({ priceFactory })

export const wishlistService = new OffersService({
    itemsService,
    wishlistItemFactory,
    priceService,
    offersType: OfferTypes.WISHLIST
})

export const marketService = new OffersService({
    itemsService,
    wishlistItemFactory,
    priceService,
    offersType: OfferTypes.MARKET
})
