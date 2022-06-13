import { PriceType } from '@/shared/items/index.js'

export class Price {
    static create (price) {
        return new Price(price)
    }

    static getDefault () {
        return new Price({
            priceType: PriceType.ANY,
            item1Id: 0,
            item1Count: 4,
            item2Id: 0,
            item2Count: 4
        })
    }

    constructor (price) {
        this.id = price.id
        this.item1Id = price.item1Id
        this.item1Count = price.item1Count
        this.item2Id = price.item2Id
        this.item2Count = price.item2Count
        this.priceType = price.priceType
    }

    get isAnyPrice () {
        return this.priceType === PriceType.ANY
    }

    get isWishlistPrice () {
        return this.priceType === PriceType.WISHLIST
    }

    get isFixedPrice () {
        return this.priceType === PriceType.FIXED
    }

    setPriceType (priceType) {
        this.priceType = priceType
    }

    setFirstItemId (itemId) {
        this.item1Id = itemId
    }

    setFirstItemCount (itemCount) {
        this.item1Count = itemCount
    }

    setSecondItemId (itemId) {
        this.item2Id = itemId
    }

    setSecondItemCount (itemCount) {
        this.item2Count = itemCount
    }

    clone () {
        return new Price(this.buildOutput())
    }

    buildOutput () {
        return {
            id: this.id,
            priceType: this.priceType,
            item1Id: this.item1Id,
            item1Count: this.item1Count,
            item2Id: this.item2Id,
            item2Count: this.item2Count
        }
    }
}
