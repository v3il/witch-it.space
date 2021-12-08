import { BadRequest } from '@curveball/http-errors'
import { Price, User, Wish } from '../models'
import { extractUserPublicData, translateText } from '../util'

const getUserWishlist = async (request, response) => {
    const { userId } = request.query
    const numericUserId = Number.parseInt(userId)

    if (!Number.isFinite(numericUserId) || numericUserId <= 0) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const user = await User.findOne({ where: { id: numericUserId } })

    if (!user) {
        throw new BadRequest(translateText('Error_BadRequest', request.locale))
    }

    const wishlist = await user.getWishes({ include: { model: Price, as: 'prices' } })

    // console.log(wishlist)

    response.send({
        wishlist,
        user: extractUserPublicData(user)
    })
}

const addToWishlist = async (request, response) => {
    const { id } = request.user
    const user = await User.findOne({ where: { id } })
    const parsedUser = user ? extractUserPublicData(user) : null

    response.send({ user: parsedUser })
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
