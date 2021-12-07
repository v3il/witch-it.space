import { ItemsService, WishlistService, UserService } from '@/services'

export default function ({ $axios }, inject) {
    inject('itemsService', new ItemsService($axios))
    inject('wishlistService', new WishlistService($axios))
    inject('userService', new UserService($axios))
}
