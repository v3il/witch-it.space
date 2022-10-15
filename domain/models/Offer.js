import { Price } from '@/domain/models/Price.js'
import { itemsService } from '@/domain/index.js'

export class Offer {
    static create (offer) {
        return new Offer(offer)
    }

    static fromItem (item) {
        return new Offer({ itemId: item.id, prices: [Price.getDefault().buildOutput()] })
    }

    constructor (offer) {
        this.id = offer.id
        this.item = itemsService.getById(offer.itemId)
        this.prices = (offer.prices || []).map(price => Price.create(price))
        this.isSelected = false
    }

    get isNew () {
        return !this.id
    }

    get isRecipe () {
        return false
    }

    buildOutput () {
        const prices = this.prices.map(priceModel => priceModel.buildOutput())

        return {
            id: this.id,
            itemId: this.item.id,
            prices
        }
    }

    update (updatedData) {
        this.id = updatedData.id
        this.prices = updatedData.prices
    }

    addPrice (price) {
        this.prices.push(price)
    }

    removePrice (priceToRemove) {
        this.prices = this.prices.filter(price => price !== priceToRemove)
    }

    setPrices (prices) {
        this.prices = prices
    }

    clone () {
        return new Offer(this.buildOutput())
    }

    toJSON () {
        return { ...this }
    }
}
