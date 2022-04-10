import { PriceType } from '@/shared/items/index.js'

export class Price {
    static create (price) {
        return new Price(price)
    }

    static getDefault () {
        return new Price({
            priceType: PriceType.ANY,
            itemId: 0,
            itemCount: 4,
            itemId2: 0,
            itemCount2: 4
        })
    }

    constructor (price) {
        this.id = price.id
        this.itemId = price.itemId
        this.itemCount = price.itemCount
        this.itemId2 = price.itemId2
        this.itemCount2 = price.itemCount2
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
        this.itemId = itemId
    }

    setFirstItemCount (itemCount) {
        this.itemCount = itemCount
    }

    setSecondItemId (itemId) {
        this.itemId2 = itemId
    }

    setSecondItemCount (itemCount) {
        this.itemCount2 = itemCount
    }

    // setItemCount ({ itemCount, position }) {
    //     const prop = position === 1 ? 'itemCount' : 'itemCount2'
    //     this[prop] = itemCount
    // }
    //
    // setItemId ({ itemId, position }) {
    //     const prop = position === 1 ? 'itemId' : 'itemId2'
    //     const prop2 = position === 1 ? 'itemCount' : 'itemCount2'
    //     this[prop] = itemId
    //
    //     if (this[prop2] === 0) {
    //         this[prop2] = 1
    //     }
    // }
    //
    // clearItemId ({ position }) {
    //     const prop = position === 1 ? 'itemId' : 'itemId2'
    //     const prop2 = position === 1 ? 'itemCount' : 'itemCount2'
    //     this[prop] = 0
    //     this[prop2] = 0
    // }

    clone () {
        return new Price(this.buildOutput())
    }

    buildOutput () {
        return {
            id: this.id,
            priceType: this.priceType,
            itemId: this.itemId,
            itemCount: this.itemCount,
            itemId2: this.itemId2,
            itemCount2: this.itemCount2
        }
    }
}
