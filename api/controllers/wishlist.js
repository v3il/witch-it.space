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

const setMassPrice = async (request, response) => {
    const { user } = request
    const { offerIds, prices } = request.body
    const schema = joi.array().required()
    const { error: idsError } = schema.validate(offerIds)
    const { error: pricesError } = schema.validate(prices)

    console.log(offerIds, prices)

    if (idsError || pricesError) {
        throw new BadRequest(request.$t('Error_BadRequest'))
    }

    const updated = await wishlistService.setMassPrice({ user, offerIds, prices })

    response.send({
        updated
    })
}

const massCreate = async (request, response) => {
    const { user } = request
    const { offers } = request.body
    const schema = joi.array().required()
    const { error } = schema.validate(offers)

    if (error) {
        throw new BadRequest(request.$t('Error_BadRequest'))
    }

    const createdOffers = await wishlistService.massCreate({ user, offers })

    response.send({
        offers: createdOffers
    })
}

const removeFromWishlist = async (request, response) => {
    const { user } = request
    const { offerIds } = request.body
    const schema = joi.array().required()
    const { error } = schema.validate(offerIds)

    if (error) {
        throw new BadRequest(request.$t('Error_BadRequest'))
    }

    const removed = await wishlistService.removeUserOffers({ user, offerIds })

    response.send({ removed })
}

const wishlistController = {
    getUserWishlist,
    removeFromWishlist,
    setMassPrice,
    massCreate
}

export { wishlistController }
