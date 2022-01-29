export class PriceService {
    #priceFactory

    constructor ({ priceFactory }) {
        this.#priceFactory = priceFactory
    }

    createDefaultPrice () {
        return this.#priceFactory.createDefaultPrice()
    }

    createPrice (rawPrice) {
        return this.#priceFactory.createPrice(rawPrice)
    }
}
