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
        await Wish.create({
            itemId: wishlistItem.itemId,
            userId: user.id,
            rawPrices: [
                {
                    priceType: 'fixed',
                    itemId: 903,
                    itemCount: 50,
                    itemId2: 904,
                    itemCount2: 20,
                    priceValue: 100
                },

                {
                    priceType: 'fixed',
                    itemId: 901,
                    itemCount: 5,
                    itemId2: 902,
                    itemCount2: 20,
                    priceValue: 10
                }
            ]
        }, { include: { model: Price, as: 'rawPrices' } })
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
