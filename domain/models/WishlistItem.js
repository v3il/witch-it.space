import { Price } from '@/domain/models/Price.js'

export class WishlistItem {
    _model
    #modelJSON

    static create ({ rawModel }) {
        return new WishlistItem({ model: rawModel })
    }

    constructor ({ model }) {
        this._model = model
        this.#modelJSON = JSON.stringify(model)
    }

    get item () {
        return this._model.item
    }

    get prices () {
        return this._model.prices
    }

    get id () {
        return this._model.id
    }

    get isNew () {
        return !this.id
    }

    get hasChanges () {
        return JSON.stringify(this._model) !== this.#modelJSON
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

    __SET_PRICES () {
        this._model.prices = [
            new Price({ priceType: 'fixed', itemId: 903, itemCount: 50, itemId2: 904, itemCount2: 50 }),
            new Price({ priceType: 'fixed', itemId: 901, itemCount: 50, itemId2: 902, itemCount2: 50 })
        ]
    }
}
