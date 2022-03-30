import { Price } from '@/domain/models'
import { PriceType } from '@/shared/items/index.js'

export class PriceFactory {
    createDefaultPrice () {
        return Price.getDefault()
    }

    createPrice (rawPrice) {
        return Price.create({ price: rawPrice })
    }
}
