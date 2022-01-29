import { PriceType } from '@/shared/items/index.js'

export class Price {
    #price

    static create ({ price }) {
        return new Price(price)
    }

    constructor (price) {
        this.#price = price
    }

    get isFixedPrice () {
        return this.#price.priceType === PriceType.FIXED
    }

    setPriceType (type) {
        this.#price.priceType = type
    }
}
