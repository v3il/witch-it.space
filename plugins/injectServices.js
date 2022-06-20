import { itemsService, usersService, wishlistService, priceService, questsService, localStorageService, marketService } from '@/domain'

export default function ({ $axios }, inject) {
    usersService.setAxios($axios)
    wishlistService.setAxios($axios)
    marketService.setAxios($axios)
    questsService.setAxios($axios)

    inject('priceService', priceService)
    inject('itemsService', itemsService)
    inject('wishlistService', wishlistService)
    inject('marketService', marketService)
    inject('usersService', usersService)
    inject('localStorageService', localStorageService)
}
