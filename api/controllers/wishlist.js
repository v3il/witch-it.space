import joi from 'joi'
import { BadRequest } from '@curveball/http-errors'
import { Wish } from '../models'
import { wishlistService } from '../services'

const getUserWishlist = async (request, response) => {
    const { userId } = request.query
    const schema = joi.number().integer().greater(0).required()
    const { error } = schema.validate(userId)

    if (error) {
        throw new BadRequest(request.$t('Error_BadRequest'))
    }

    const wishlist = await wishlistService.getUserWishes(userId)

    response.send({
        wishlist
    })
}

const manage = async (request, response) => {
    const { user } = request
    const { wishlist } = request.body
    const { created, updated } = await wishlistService.manage(user, wishlist)

    response.send({ created, updated })
}

const removeFromWishlist = async (request, response) => {
    const { entityIds } = request.body

    if (!Array.isArray(entityIds)) {
        throw new BadRequest(request.$t('Error_BadRequest'))
    }

    if (!entityIds.length) {
        return response.send({ removed: 0 })
    }

    const removed = await Wish.destroy({
        where: {
            id: entityIds,
            userId: request.user.id
        }
    })

    response.send({ removed })
}

const wishlistController = {
    getUserWishlist,
    manage,
    removeFromWishlist
}

export { wishlistController }
