import { itemsService, usersService, wishlistService, priceService } from '@/domain'

export default function ({ $axios }, inject) {
    usersService.setAxios($axios)
    wishlistService.setAxios($axios)

    inject('priceService', priceService)
    inject('itemsService', itemsService)
    inject('wishlistService', wishlistService)
    inject('usersService', usersService)
}
