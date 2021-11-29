export class ItemsService {
    #items = {}

    getById (id) {
        return this.#items.find(item => id === item.id)
    }

    setItems (items) {
        this.#items = items
    }

    toList () {
        return Object.values(this.#items)
    }
}
