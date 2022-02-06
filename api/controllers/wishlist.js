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

    for (const wishlistItem of wishlist) {
        if (wishlistItem.id) {
            const wi = await Wish.findOne({ where: { id: wishlistItem.id } })
            const newPrices = wishlistItem.rawPrices
            const prices = await wi.getRawPrices()

            for (const price of prices) {
                const oldPrice = newPrices.find(p => p.id === price.id)

                if (oldPrice) {
                    await price.update({
                        priceType: oldPrice.priceType,
                        itemId: oldPrice.itemId,
                        itemCount: oldPrice.itemCount,
                        itemId2: oldPrice.itemId2,
                        itemCount2: oldPrice.itemCount2
                    })
                } else {
                    console.log(111)
                }

                console.log(price.id, oldPrice)
            }

            console.log(newPrices, prices)
        }

        // const wiwi = await Wish.upsert({
        //     id: wishlistItem.id,
        //     itemId: wishlistItem.itemId,
        //     userId: user.id
        //     // rawPrices: wishlistItem.rawPrices
        // })
        //
        // console.log(wiwi.id)
        //
        // for (const price of wishlistItem.rawPrices) {
        //     console.log({
        //         id: price.id,
        //         priceType: price.priceType,
        //         itemId: price.itemId,
        //         itemCount: price.itemCount,
        //         itemId2: price.itemId2,
        //         itemCount2: price.itemCount2,
        //         offerId: wishlistItem.id
        //     })
        //
        //     await Price.upsert({
        //         id: price.id,
        //         priceType: price.priceType,
        //         itemId: price.itemId,
        //         itemCount: price.itemCount,
        //         itemId2: price.itemId2,
        //         itemCount2: price.itemCount2,
        //         offerId: wishlistItem.id
        //     })
        // }
    }

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
    const parsedUser = user ? extractUserPublicData(user) : null

    response.send({ user: parsedUser })
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
