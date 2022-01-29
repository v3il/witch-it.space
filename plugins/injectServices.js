import { itemsService, usersService, wishlistService } from '@/domain/services'

export default function ({ $axios }, inject) {
    usersService.setAxios($axios)
    wishlistService.setAxios($axios)

    console.error(1)

    inject('itemsService', itemsService)
    inject('wishlistService', wishlistService)
    inject('usersService', usersService)
}
