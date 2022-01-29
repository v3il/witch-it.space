export class WishlistItem {
    #model
    #item

    static create ({ rawModel }) {
        return new WishlistItem({ model: rawModel })
    }

    static fromSaved ({ model, item }) {
        return new WishlistItem({ model, item })
    }

    static fromNew ({ item }) {
        return new WishlistItem({
            item,
            model: {
                id: null,
                prices: [{
                    priceType: 'any',
                    itemId: 0,
                    itemCount: 4,
                    itemId2: 0,
                    itemCount2: 4
                }]
            }
        })
    }

    constructor ({ model, item }) {
        this.#model = model
        this.#item = item
    }

    get item () {
        return this.#model.item
    }

    get prices () {
        return this.#model.prices
    }

    get id () {
        return this.#model.id
    }

    removePrice (priceToRemove) {
        this.#model.prices = this.prices.filter(price => price !== priceToRemove)
    }
}
