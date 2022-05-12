import joi from 'joi'
import { wishlistService } from '../services'

const getUserWishlist = (request, response) => {
    const { userId } = request.query
    const schema = joi.number().integer().greater(0).required()
    const { error } = schema.validate(userId)

    if (error) {
        return response.emitBadRequest()
    }

    wishlistService.getUserWishes(userId)
        .then(({ offers, profile }) => response.send({ offers, profile }))
        .catch(() => response.emitUnprocessableEntity(request.$t('Error_WishlistFetchError')))
}

const massCreate = async (request, response) => {
    const { user } = request
    const { offers } = request.body
    const schema = joi.array().required()
    const { error } = schema.validate(offers)

    if (error) {
        return response.emitBadRequest()
    }

    try {
        const isValidOffers = await wishlistService.isValidOffers(offers, user)

        if (!isValidOffers) {
            return response.emitBadRequest()
        }

        const createdOffers = await wishlistService.massCreate({ user, offers })
        response.send({ createdOffers })
    } catch (e) {
        response.emitUnprocessableEntity()
    }
}

const massUpdate = (request, response) => {
    const { user } = request
    const { offerIds, prices } = request.body
    const schema = joi.array().required()
    const { error: idsError } = schema.validate(offerIds)
    const { error: pricesError } = schema.validate(prices)
    const isValidPrices = wishlistService.isValidPrices(prices)

    if (idsError || pricesError || !isValidPrices) {
        return response.emitBadRequest()
    }

    wishlistService.setMassPrice({ user, offerIds, prices })
        .then(updatedOffers => response.send({ updatedOffers }))
        .catch(() => response.emitUnprocessableEntity())
}

const removeFromWishlist = (request, response) => {
    const { user } = request
    const { offerIds } = request.body
    const schema = joi.array().required()
    const { error } = schema.validate(offerIds)

    if (error) {
        return response.emitBadRequest()
    }

    wishlistService.removeUserOffers({ user, offerIds })
        .then(removedOffersCount => response.send({ removedOffersCount }))
        .catch((e) => {
            console.log(e)
            response.emitUnprocessableEntity()
        })
}

export const wishlistController = {
    getUserWishlist,
    removeFromWishlist,
    massUpdate,
    massCreate
}
