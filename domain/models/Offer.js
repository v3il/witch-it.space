export class Offer {
    _model
    #modelJSON

    static create ({ rawModel }) {
        return new Offer({ model: rawModel })
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

        return new Offer({ model })
    }

    getData () {
        const rawPrices = this.prices.map(priceModel => priceModel.getData())

        return {
            id: this.id,
            itemId: this.item.id,
            rawPrices
        }
    }

    update (updatedData) {
        this._model.id = updatedData.id
        this._model.prices = updatedData.prices
        this.#modelJSON = JSON.stringify(this._model)
    }

    setPrices (prices) {
        this._model.prices = prices.map(price => price.clone())
    }
}
