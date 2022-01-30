import { PriceType } from '@/shared/items/index.js'

export class Price {
    price

    id
    priceType
    item1Id
    item1Count
    item2Id
    item2Count

    static create ({ price }) {
        return new Price(price)
    }

    constructor (price) {
        this.id = price.id
        this.priceType = price.priceType
        this.item1Id = price.itemId
        this.item1Count = price.itemCount
        this.item2Id = price.itemId2
        this.item2Count = price.itemCount2

        this.price = price
    }

    // get price () {
    //     return this.price
    // }

    // get item1Id () {
    //     return this.price.itemId
    // }
    //
    // get item1Count () {
    //     return this.price.itemCount
    // }
    //
    // get item2Id () {
    //     return this.price.itemId2
    // }
    //
    // get item2Count () {
    //     return this.price.itemCount2
    // }

    // get priceType () {
    //     return this.priceType
    // }

    get isFixedPrice () {
        return this.priceType === PriceType.FIXED
    }

    setPriceType (type) {
        this.priceType = type

        console.log(this.priceType)
    }

    toJSON () {
        return { ...this } // here I make a POJO's copy of the class instance
    }
}
