import { PriceType } from '@/shared/items/index.js'

export class Price {
    _rawPrice

    static create ({ price }) {
        return new Price(price)
    }

    constructor (price) {
        this._rawPrice = price
    }

    get id () {
        return this._rawPrice.id
    }

    get item1Id () {
        return this._rawPrice.itemId
    }

    get item1Count () {
        return this._rawPrice.itemCount
    }

    get item2Id () {
        return this._rawPrice.itemId2
    }

    get item2Count () {
        return this._rawPrice.itemCount2
    }

    get priceType () {
        return this._rawPrice.priceType
    }

    get isFixedPrice () {
        return this.priceType === PriceType.FIXED
    }

    setPriceType (type) {
        this._rawPrice.priceType = type
    }

    setItem1Id (id) {
        this._rawPrice.itemId = id
    }

    setItem1Count (count) {
        this._rawPrice.itemCount = count
    }

    setItem2Id (id) {
        this._rawPrice.itemId2 = id
    }

    setItem2Count (count) {
        this._rawPrice.itemCount2 = count
    }
}
