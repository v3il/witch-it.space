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

    getPrimaryIngredients () {
        return [900, 901, 902, 903, 904].map(id => this.getById(id))
    }

    getSecondaryIngredients () {
        return [910, 911, 912, 913, 914, 915, 916, 917, 918].map(id => this.getById(id))
    }
}
