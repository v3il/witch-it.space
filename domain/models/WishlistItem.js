export class WishlistItem {
    _model

    static create ({ rawModel }) {
        return new WishlistItem({ model: rawModel })
    }

    constructor ({ model }) {
        this._model = model
    }

    get item () {
        return this._model.item
    }

    get prices () {
        return this._model.prices
    }

    get id () {
        return this._model.id || Math.random()
    }

    addPrice (price) {
        this._model.prices.push(price)
    }

    removePrice (priceToRemove) {
        this._model.prices = this.prices.filter(price => price !== priceToRemove)
    }

    clone () {
        const prices = this.prices.map(price => price.clone())
        const model = { ...this._model, prices }

        return new WishlistItem({ model })
    }
}
