import { Price } from '@/domain/models'
import { PriceType } from '@/shared/items/index.js'

export class PriceFactory {
    createDefaultPrice () {
        return Price.create({
            price: {
                priceType: PriceType.ANY,
                itemId: 0,
                itemCount: 4,
                itemId2: 0,
                itemCount2: 4
            }
        })
    }

    createPrice (rawPrice) {
        return Price.create({ price: rawPrice })
    }
}
