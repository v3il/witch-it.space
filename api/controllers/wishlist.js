import joi from 'joi'
import { BadRequest, UnprocessableEntity } from '@curveball/http-errors'
import { Wish } from '../models'
import { wishlistService } from '../services'

const getUserWishlist = async (request, response) => {
    const { userId } = request.query
    const schema = joi.number().integer().greater(0).required()
    const { error } = schema.validate(userId)

    if (error) {
        throw new BadRequest(request.$t('Error_BadRequest'))
    }

    try {
        const offers = await wishlistService.getUserWishes(userId)
        response.send({ offers })
    } catch (error) {
        throw new UnprocessableEntity(request.$t('Error_WishlistFetchError'))
    }
}

const setMassPrice = async (request, response) => {
    const { user } = request
    const { offerIds, prices } = request.body
    const schema = joi.array().required()
    const { error: idsError } = schema.validate(offerIds)
    const { error: pricesError } = schema.validate(prices)
    const isValidPrices = wishlistService.isValidPrices(prices)

    if (idsError || pricesError || !isValidPrices) {
        throw new BadRequest(request.$t('Error_BadRequest'))
    }

    try {
        const updated = await wishlistService.setMassPrice({ user, offerIds, prices })
        response.send({ updated })
    } catch (e) {
        throw new UnprocessableEntity(request.$t('Error_WishlistSetMassPriceError'))
    }
}

const massCreate = async (request, response) => {
    const { user } = request
    const { offers } = [{ itemId: 9999999 }] // request.body
    const schema = joi.array().required()
    const { error } = schema.validate(offers)

    if (error) {
        throw new BadRequest(request.$t('Error_BadRequest'))
    }

    try {
        const isValidOffers = await wishlistService.isValidOffers(offers, user)

        console.log(isValidOffers)

        if (!isValidOffers) {
            return response.status(400).send({ error: request.$t('Error_BadRequest') })
        }

        const created = await wishlistService.massCreate({ user, offers })

        response.send({
            created
        })
    } catch (e) {
        console.log(333, e)
        throw new UnprocessableEntity(request.$t('Error_WishlistSetMassPriceError'))
    }
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
