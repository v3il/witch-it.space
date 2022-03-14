import { Price, sequelize, Wish } from '../models'

export class WishlistService {
    #priceService

    constructor ({ priceService }) {
        this.#priceService = priceService
    }

    async getUserWishes (userId) {
        return await Wish.findAll({
            where: { userId },

            order: [
                [{ model: Price, as: 'rawPrices' }, 'id', 'ASC']
            ],

            include: {
                model: Price,
                as: 'rawPrices'
            }
        })
    }

    async setMassPrice ({ user, offerIds, prices }) {
        const normalizedPrices = this.#priceService.normalizeRawPrices(prices)

        const offers = await user.getWishes({
            where: { id: offerIds },
            include: { model: Price, as: 'rawPrices' }
        })

        for (const offer of offers) {
            await sequelize.transaction(async (transaction) => {
                if (offer.rawPrices.length > prices.length) {
                    await offer.rawPrices[1].destroy({ transaction })
                }

                for (let i = 0; i < normalizedPrices.length; i++) {
                    if (offer.rawPrices[i]) {
                        await offer.rawPrices[i].update(normalizedPrices[i], { transaction })
                        continue
                    }

                    await Price.create({ ...normalizedPrices[i], priceValue: 0, offerId: offer.id }, { transaction })
                }
            })
        }

        return user.getWishes({
            where: { id: offerIds },
            include: { model: Price, as: 'rawPrices' }
        })
    }

    async manage (user, wishlist) {
        const updatedIds = []
        const itemsToSave = []

        console.clear('manage', wishlist)

        const existingWishlistItems = await user.getWishes({
            include: { model: Price, as: 'rawPrices' }
        })

        for (const wishlistItem of wishlist) {
            const { id, itemId } = wishlistItem

            if (!id) {
                const existingByItemId = existingWishlistItems.find(existingItem => existingItem.itemId === itemId)

                if (existingByItemId) {
                    continue
                }

                itemsToSave.push({
                    itemId,
                    userId: user.id,
                    rawPrices: this.#priceService.normalizeRawPrices(wishlistItem.rawPrices)
                })

                console.log('Create')

                continue
            }

            const existingModel = existingWishlistItems.find(existingItem => existingItem.id === id)

            if (!existingModel) {
                continue
            }

            await sequelize.transaction(async (transaction) => {
                const removedPrices = existingModel.rawPrices
                    .filter(existingPrice => !wishlistItem.rawPrices.some(rawPrice => rawPrice.id === existingPrice.id))

                await Price.destroy({
                    transaction,
                    where: { id: removedPrices.map(existingPrice => existingPrice.id) }
                })

                const normalizedPrices = this.#priceService.normalizeRawPrices(wishlistItem.rawPrices)

                for (const price of normalizedPrices) {
                    await Price.upsert({
                        ...price,
                        offerId: existingModel.id
                    }, { returning: true, transaction })
                }

                updatedIds.push(existingModel.id)
            })
        }

        const created = await Wish.bulkCreate(itemsToSave, {
            include: { model: Price, as: 'rawPrices' }
        })

        const updated = await Wish.findAll({
            where: { id: updatedIds },
            order: [[{ model: Price, as: 'rawPrices' }, 'id', 'ASC']],
            include: { model: Price, as: 'rawPrices' }
        })

        return { created, updated }
    }
}
