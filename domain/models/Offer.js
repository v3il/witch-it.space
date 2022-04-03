import { Price } from '@/domain/models/Price.js'
import { itemsService } from '@/domain/index.js'

export class Offer {
    static create (offer) {
        return new Offer(offer)
    }

    static fromItem (item) {
        return new Offer({ itemId: item.id, rawPrices: [Price.getDefault().buildOutput()] })
    }

    constructor (offer) {
        this.id = offer.id
        this.item = itemsService.getById(offer.itemId)
        this.prices = (offer.rawPrices || []).map(price => Price.create(price))
    }

    get isNew () {
        return !this.id
    }

    get isRecipe () {
        return false
    }

    buildOutput () {
        const rawPrices = this.prices.map(priceModel => priceModel.buildOutput())

        return {
            id: this.id,
            itemId: this.item.id,
            rawPrices
        }
    }

    update (updatedData) {
        this.id = updatedData.id
        this.prices = updatedData.prices
    }

    setPrices (prices) {
        this.prices = prices
    }

    clone () {
        return new Offer(this.buildOutput())
    }
}
