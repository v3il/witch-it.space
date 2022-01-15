export class WishlistItem {
    #id
    #item
    #prices

    static fromSaved ({ id, item, prices }) {
        return new WishlistItem({ id, item, prices })
    }

    static fromNew ({ item }) {
        return new WishlistItem({ id: null, item, prices: [] })
    }

    constructor ({ id, item, prices }) {
        this.#id = id
        this.#item = item
        this.#prices = prices
    }

    get item () {
        return this.#item
    }

    get prices () {
        return this.#prices
    }

    toString () {
        return String(this.#item.id)
    }
}
