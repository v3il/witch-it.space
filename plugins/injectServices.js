import { ItemsService } from '@/services/ItemsService'

export default function ({ $axios }, inject) {
    inject('itemsService', new ItemsService($axios))
}
