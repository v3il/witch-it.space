export class ItemsService {
    #items = {}

    setItems (items) {
        this.#items = items
    }

    getById (id) {
        return this.#items[String(id)]
    }

    toList () {
        return Object.values(this.#items)
    }

    getPrimaryTradeableItems () {
        return [901, 902, 903, 904, 905].map(id => this.getById(id))
    }

    getSecondaryTradeableItems () {
        return [901, 902, 903, 904, 905]
    }
}
