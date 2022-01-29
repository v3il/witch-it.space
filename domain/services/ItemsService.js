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
}
