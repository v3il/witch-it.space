import { Item, Price, Offer, Quest } from '../models'
import { userService } from '../services/index.js'

export class WishlistService {
    #priceService

    constructor ({ priceService }) {
        this.#priceService = priceService
    }

    async getUserWishes (userId) {
        const profile = await userService.getById(userId)

        if (!profile) {
            return { profile: null, offers: [] }
        }

        const offers = await this.#getUserWishes({ userId })

        return { profile: profile.getPublicData(), offers }
    }

    #getUserWishes ({ userId, offerIds }, attrs = []) {
        let builder = Offer.query().select(...attrs).where('userId', userId)

        if (offerIds) {
            builder = builder.whereIn('id', offerIds)
        }

        return builder.withGraphFetched('prices')
    }

    async setMassPrice ({ user, offerIds, prices }) {
        const offers = await this.#getUserWishes({ userId: user.id, offerIds })

        await Offer.transaction(async (trx) => {
            for (const offer of offers) {
                if (offer.prices.length > prices.length) {
                    await offer.prices[1].$query(trx).del()
                }

                for (let i = 0; i < prices.length; i++) {
                    if (offer.prices[i]) {
                        await offer.prices[i].$query(trx).patch(prices[i])
                        continue
                    }

                    await Price.query(trx).insert({ ...prices[i], priceValue: 0, offerId: offer.id })
                }
            }

            await userService.setWishlistUpdateTime(user)
        })

        return this.#getUserWishes({ userId: user.id, offerIds })
    }

    isValidPrices (prices) {
        if (!prices.length) {
            return false
        }

        return prices.every(price => this.#priceService.isValidPrice(price))
    }

    async isValidOffers (offers, user) {
        const itemIds = (await Item.query().select('itemId')).map(item => item.itemId)
        const itemsInWishlistIds = (await this.#getUserWishes({ userId: user.id }, ['itemId'])).map(offer => offer.itemId)

        return offers.every((offer) => {
            return itemIds.includes(offer.itemId) &&
                !itemsInWishlistIds.includes(offer.itemId) &&
                this.isValidPrices(offer.prices)
        })
    }

    async massCreate ({ user, offers }) {
        const mappedOffers = offers.map(offer => ({
            ...offer,
            itemId: offer.itemId,
            userId: user.id
        }))

        await userService.setWishlistUpdateTime(user)

        return Offer.query().insertGraphAndFetch(mappedOffers)
    }

    async removeUserOffers ({ user, offerIds }) {
        if (!offerIds.length) {
            return 0
        }

        await userService.setWishlistUpdateTime(user)

        return Offer.query().where('userId', user.id).whereIn('id', offerIds).del()
    }
}
