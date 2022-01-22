export class WishlistItem {
    #model
    #item

    static fromSaved ({ model, item }) {
        return new WishlistItem({ model, item })
    }

    static fromNew ({ item }) {
        return new WishlistItem({
            item,
            model: {
                id: null,
                prices: []
            }
        })
    }

    constructor ({ model, item }) {
        this.#model = model
        this.#item = item
    }

    get item () {
        return this.#item
    }

    get prices () {
        return this.#model.prices || []
    }

    get id () {
        return this.#model.id
    }
}
