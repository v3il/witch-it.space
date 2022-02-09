export class ItemsService {
    #items = {}
    #primary = []
    #secondary = []

    setItems (items) {
        this.#items = items
        this.#primary = [900, 901, 902, 903, 904].map(id => this.getById(id))
        this.#secondary = [910, 911, 912, 913, 914, 915, 916, 917, 918].map(id => this.getById(id))
    }

    getById (id) {
        return this.#items[String(id)]
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
