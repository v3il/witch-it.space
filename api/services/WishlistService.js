import { Price, sequelize, Wish } from '../models'

export class WishlistService {
    #priceService

    constructor ({ priceService }) {
        this.#priceService = priceService
    }

    async manage (user, wishlist) {
        const itemsToSave = []

        console.log('manage', wishlist)

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

                await Wish.update({
                    id,
                    itemId,
                    rawPrices: this.#priceService.normalizeRawPrices(wishlistItem.rawPrices)
                }, { include: { model: Price, as: 'rawPrices' }, transaction })

                console.log('Update')
            })
        }

        console.log('Create2', itemsToSave)

        await Wish.bulkCreate(itemsToSave, {
            include: { model: Price, as: 'rawPrices' }
        })

        // console.log(JSON.stringify(itemsToSave, null, 2))
        // console.log(JSON.stringify(itemsToUpdate, null, 2))
        // console.log(JSON.stringify(pricesToRemoveIds, null, 2))
    }
}
