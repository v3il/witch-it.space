import { PRIMARY, SECONDARY } from '@/shared/items/index.js'
import { Item } from '@/domain/models'

export class ItemsService {
    #items = {}
    #primary = []
    #secondary = []

    setItems (items) {
        console.log(items)

        items.forEach((itemData) => {
            this.#items[itemData.itemId] = Item.create(itemData)
        })

        this.#primary = PRIMARY.map(id => this.getById(id))
        this.#secondary = SECONDARY.map(id => this.getById(id))
    }

    getById (id) {
        return Object.freeze(this.#items[String(id)])
    }

    toList () {
        return Object.values(this.#items)
    }

    getPrimaryIngredients () {
        return this.#primary
    }

    getSecondaryIngredients () {
        return this.#secondary
    }

    getTradableItems () {
        return this.toList().filter(item => item.isTradable)
    }
}
