import { PRIMARY, SECONDARY } from '@/shared/items/index.js'

export class ItemsService {
    #items = {}
    #primary = []
    #secondary = []

    setItems (items) {
        this.#items = items
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
}
