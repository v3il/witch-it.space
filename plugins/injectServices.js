import { itemsService, usersService, wishlistService, priceService, questsService } from '@/domain'

export default function ({ $axios }, inject) {
    usersService.setAxios($axios)
    wishlistService.setAxios($axios)
    questsService.setAxios($axios)

    inject('priceService', priceService)
    inject('itemsService', itemsService)
    inject('wishlistService', wishlistService)
    inject('usersService', usersService)
}
