import { BasicModel } from './BasicModel.js'
import { Price } from './Price.js'

export class Offer extends BasicModel {
    static create ({ rawModel }) {
        return new Offer({ originalModel: rawModel })
    }

    // constructor ({ originalModel }) {
    //     originalModel.prices = originalModel.rawPrices.map(rawPrice => new Price(rawPrice))
    //     super({ originalModel })
    // }

    get id () {
        return this.originalModel.id
    }

    get item () {
        return this.originalModel.item
    }

    get prices () {
        return this.originalModel.prices
    }

    get isNew () {
        return !this.id
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
        this.originalModel.id = updatedData.id
        this.originalModel.prices = updatedData.prices
    }

    setPrices (prices) {
        this.originalModel.prices = prices
    }

    // Changed

    get changedPrices () {
        return this.changedModel.prices
    }

    addPrice (price) {
        this.changedModel.prices.push(price)
    }

    removePrice (priceToRemove) {
        this.changedModel.prices = this.changedModel.prices.filter(price => price !== priceToRemove)
    }
}
