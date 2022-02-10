import { BadRequest } from '@curveball/http-errors'
import { Price, Quest, User, Wish } from '../models'
import { extractOtherUsersPublicData, extractUserPublicData, translateText } from '../util'
import { userService } from '../services/index.js'

const r = () => Math.floor(Math.random() * 100)

const getUserWishlist = async (request, response) => {
    const { userId } = request.query
    const numericUserId = Number.parseInt(userId)

    if (!Number.isFinite(numericUserId) || numericUserId <= 0) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const user = await userService.getById(numericUserId)

    if (!user) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const wishlist = await user.getWishes({
        order: [
            [{ model: Price, as: 'rawPrices' }, 'id', 'ASC']
        ],
        include: {
            model: Price,
            as: 'rawPrices'
        }
    })

    response.send({
        wishlist
    })
}

const addToWishlist = async (request, response) => {
    const { id } = request.user
    const user = await User.findOne({ where: { id } })
    const { wishlist } = request.body

    const existingModelIds = wishlist.map(wishlistItem => wishlistItem.id)
    const models = await Wish.findAll({
        where: {
            id: existingModelIds
        },
        include: [{ model: Price, as: 'rawPrices' }]
    })

    console.log(models)

    for (const wishlistItem of wishlist) {
        let model = models.find(model => model.id === wishlistItem.id)

        if (!model) {
            model = await Wish.create({
                id: wishlistItem.id,
                itemId: wishlistItem.itemId,
                userId: user.id
            })
        }

        for (const priceModel of (model.rawPrices || [])) {
            const raw = wishlistItem.rawPrices.find(raw => raw.id === priceModel.id)

            if (!raw) {
                console.error('Remove', priceModel.get())

                await priceModel.destroy()
            }
        }

        for (const rawPrice of /* wishlistItem.rawPrices */ [
            {
                priceType: 'fixed',
                itemId: 903,
                itemCount: 10,
                itemId2: 904,
                itemCount2: 10,
                priceValue: 0
            },

            {
                priceType: 'fixed',
                itemId: 903,
                itemCount: 10,
                itemId2: 904,
                itemCount2: 10,
                priceValue: 0
            }
        ]) {
            const priceModel = (model.rawPrices || []).find(model => model.id === rawPrice.id)

            if (priceModel) {
                console.error('Update', priceModel.get())
                await priceModel.update({
                    priceType: rawPrice.priceType,
                    itemId: rawPrice.itemId,
                    itemCount: rawPrice.itemCount,
                    itemId2: rawPrice.itemId2,
                    itemCount2: rawPrice.itemCount2,
                    priceValue: 0
                })
            } else {
                console.error('Create', {
                    priceType: rawPrice.priceType,
                    itemId: rawPrice.itemId,
                    itemCount: rawPrice.itemCount,
                    itemId2: rawPrice.itemId2,
                    itemCount2: rawPrice.itemCount2
                })

                const a = await Price.create({
                    offerId: model.id,
                    priceType: rawPrice.priceType,
                    itemId: rawPrice.itemId,
                    itemCount: rawPrice.itemCount,
                    itemId2: rawPrice.itemId2,
                    itemCount2: rawPrice.itemCount2,
                    priceValue: 0
                })

                console.error('Create', a.get())
            }
        }
    }

    //     if (wishlistItem.id) {
    //         const wi = await Wish.findOne({ where: { id: wishlistItem.id } })
    //         const newPrices = wishlistItem.rawPrices
    //         const prices = await wi.getRawPrices()
    //
    //         for (const price of prices) {
    //             const oldPrice = newPrices.find(p => p.id === price.id)
    //
    //             if (oldPrice) {
    //                 await price.update({
    //                     priceType: oldPrice.priceType,
    //                     itemId: oldPrice.itemId,
    //                     itemCount: oldPrice.itemCount,
    //                     itemId2: oldPrice.itemId2,
    //                     itemCount2: oldPrice.itemCount2
    //                 })
    //             } else {
    //                 console.log(111)
    //             }
    //
    //             console.log(price.id, oldPrice)
    //         }
    //
    //         console.log(newPrices, prices)
    //     }
    //
    //     // const wiwi = await Wish.upsert({
    //         id: wishlistItem.id,
    //         itemId: wishlistItem.itemId,
    //         userId: user.id
    //     //     // rawPrices: wishlistItem.rawPrices
    //     // })
    //     //
    //     // console.log(wiwi.id)
    //     //
    //     // for (const price of wishlistItem.rawPrices) {
    //     //     console.log({
    //     //         id: price.id,
    //     //         priceType: price.priceType,
    //     //         itemId: price.itemId,
    //     //         itemCount: price.itemCount,
    //     //         itemId2: price.itemId2,
    //     //         itemCount2: price.itemCount2,
    //     //         offerId: wishlistItem.id
    //     //     })
    //     //
    //     //     await Price.upsert({
    //     //         id: price.id,
    //     //         priceType: price.priceType,
    //     //         itemId: price.itemId,
    //     //         itemCount: price.itemCount,
    //     //         itemId2: price.itemId2,
    //     //         itemCount2: price.itemCount2,
    //     //         offerId: wishlistItem.id
    //     //     })
    //     // }
    // }

    // await Wish.create({
    //     rewardId,
    //     rewardCount,
    //     questTask: quest.name,
    //     questType: quest.type,
    //     globalId: quest.id,
    //     localId: quest.questId,
    //     objective: quest.objective1Max,
    //     progress: quest.objective1Val,
    //     userId: user.id
    // }, { transaction })

    // const parsedUser = user ? extractUserPublicData(user) : null

    response.send({ ok: 1 })
}

const editWishlistItem = async (request, response) => {
    const { id } = request.user
    const user = await User.findOne({ where: { id } })
    const parsedUser = user ? extractUserPublicData(user) : null

    response.send({ user: parsedUser })
}

const removeFromWishlist = async (request, response) => {
    const { id } = request.user
    const user = await User.findOne({ where: { id } })
    const { ids } = request.body

    await Wish.destroy({
        where: {
            id: ids,
            userId: user.id
        },
        logging: console.log
    })

    response.send({ })
}

const isWishlistedItem = async (request, response) => {
    const { id } = request.user
    const user = await User.findOne({ where: { id } })
    const parsedUser = user ? extractUserPublicData(user) : null

    response.send({ user: parsedUser })
}

const wishlistController = {
    getUserWishlist,
    addToWishlist,
    editWishlistItem,
    removeFromWishlist,
    isWishlistedItem
}

export { wishlistController }
