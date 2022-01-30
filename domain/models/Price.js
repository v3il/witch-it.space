import { PriceType } from '@/shared/items/index.js'

export class Price {
    #price

    static create ({ price }) {
        return new Price(price)
    }

    constructor (price) {
        this.#price = { ...price }
    }

    get price () {
        return { ...this.#price }
    }

    get item1Id () {
        return this.#price.itemId
    }

    get item1Count () {
        return this.#price.itemCount
    }

    get item2Id () {
        return this.#price.itemId2
    }

    get item2Count () {
        return this.#price.itemCount2
    }

    get isFixedPrice () {
        return this.#price.priceType === PriceType.FIXED
    }

    setPriceType (type) {
        this.#price.priceType = type
    }

    toJSON () {
        return this.#price
    }
}
