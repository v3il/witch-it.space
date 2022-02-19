import { Price, sequelize, Wish } from '../models'

export class WishlistService {
    #priceService

    constructor ({ priceService }) {
        this.#priceService = priceService
    }

    async manage (user, wishlist) {
        const updated = []
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
                console.log(existingModel.rawPrices)

                const removedPrices = existingModel.rawPrices
                    .filter(existingPrice => !wishlistItem.rawPrices.some(rawPrice => rawPrice.id === existingPrice.id))

                await Price.destroy({
                // transaction,
                    where: { id: removedPrices.map(existingPrice => existingPrice.id) }
                })

                const normalizedPrices = this.#priceService.normalizeRawPrices(wishlistItem.rawPrices)

                console.log(normalizedPrices)

                for (const price of normalizedPrices) {
                // await existingModel.addRawPrice(price)

                    await Price.upsert({
                        ...price,
                        offerId: existingModel.id
                    }, { returning: true/*, transaction */ })
                }

                await existingModel.reload({
                    include: { model: Price, as: 'rawPrices' }
                })

                // const a = await existingModel.getRawPrices()
                //
                // console.log(3333, a)

                // console.log(await user.getWishes({
                //     where: { id: existingModel.id },
                //     include: { model: Price, as: 'rawPrices' }
                // }))

                updated.push(existingModel)

                // await existingModel.update({
                //     rawPrices: this.#priceService.normalizeRawPrices(wishlistItem.rawPrices)
                // }, { include: { model: Price, as: 'rawPrices' }, transaction })

                console.log('Update')
            })
        }

        const created = await Wish.bulkCreate(itemsToSave, {
            include: { model: Price, as: 'rawPrices' }
        })

        console.log(created)
        console.log(updated[0]?.get({ raw: true }))

        return { created, updated }
    }
}
