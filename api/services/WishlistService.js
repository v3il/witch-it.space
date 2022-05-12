import { Item, Price, sequelize, Wish, User } from '../models'
import { userService } from '../services/index.js'

export class WishlistService {
    #priceService

    constructor ({ priceService }) {
        this.#priceService = priceService
    }

    async getUserWishes (userId) {
        const profile = await userService.getById(userId)

        const offers = await Wish.findAll({
            where: { userId },

            order: [
                [{ model: Price, as: 'rawPrices' }, 'id', 'ASC']
            ],

            include: {
                model: Price,
                as: 'rawPrices'
            }
        })

        return { profile: userService.toObject(profile), offers }
    }

    async setMassPrice ({ user, offerIds, prices }) {
        const offers = await user.getWishes({
            where: { id: offerIds },
            include: { model: Price, as: 'rawPrices' }
        })

        for (const offer of offers) {
            await sequelize.transaction(async (transaction) => {
                if (offer.rawPrices.length > prices.length) {
                    await offer.rawPrices[1].destroy({ transaction })
                }

                for (let i = 0; i < prices.length; i++) {
                    if (offer.rawPrices[i]) {
                        await offer.rawPrices[i].update(prices[i], { transaction })
                        continue
                    }

                    await Price.create({ ...prices[i], priceValue: 0, offerId: offer.id }, { transaction })
                }
            })
        }

        await userService.setWishlistUpdateTime(user)

        return user.getWishes({
            where: { id: offerIds },
            include: { model: Price, as: 'rawPrices' }
        })
    }

    isValidPrices (prices) {
        console.error(prices)

        if (!prices.length) {
            return false
        }

        return prices.every(price => this.#priceService.isValidPrice(price))
    }

    async isValidOffers (offers, user) {
        const itemIds = (await Item.findAll({ attributes: ['itemId'], raw: true })).map(item => item.itemId)
        const itemsInWishlistIds = (await user.getWishes({ attributes: ['itemId'], raw: true })).map(offer => offer.itemId)

        return offers.every((offer) => {
            console.error(JSON.stringify(offer))

            return itemIds.includes(offer.itemId) &&
                !itemsInWishlistIds.includes(offer.itemId) &&
                this.isValidPrices(offer.rawPrices)
        })
    }

    async massCreate ({ user, offers }) {
        const mappedOffers = offers.map(offer => ({
            ...offer,
            itemId: offer.itemId,
            userId: user.id
        }))

        await userService.setWishlistUpdateTime(user)

        return Wish.bulkCreate(mappedOffers, {
            include: { model: Price, as: 'rawPrices' }
        })
    }

    async removeUserOffers ({ user, offerIds }) {
        if (!offerIds.length) {
            return 0
        }

        await userService.setWishlistUpdateTime(user)

        return Wish.destroy({
            where: {
                id: offerIds,
                userId: user.id
            }
        })
    }
}
