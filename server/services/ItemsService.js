import { Item } from '~/server/models/Item'

export class ItemsService {
    getAll () {
        return Item.query().select()
    }
}
