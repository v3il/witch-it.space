import joi from 'joi'
import { marketService } from '../../../WitchTrade/api/services'

const getUserOffers = (request, response) => {
    const { userId } = request.query
    const schema = joi.number().integer().greater(0).required()
    const { error } = schema.validate(userId)

    if (error) {
        return response.emitBadRequest()
    }

    marketService.getUserWishes(userId)
        .then(({ offers, profile }) => response.send({ offers, profile }))
        .catch((e) => {
            console.error(e)
            response.emitUnprocessableEntity(request.$t('Error_WishlistFetchError'))
        })
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
        const isValidOffers = await marketService.isValidOffers(offers, user)

        if (!isValidOffers) {
            return response.emitBadRequest()
        }

        const createdOffers = await marketService.massCreate({ user, offers })
        response.send({ createdOffers })
    } catch (e) {
        console.error(e)
        response.emitUnprocessableEntity()
    }
}

const massUpdate = (request, response) => {
    const { user } = request
    const { offerIds, prices } = request.body

    console.error(offerIds, prices)

    const schema = joi.array().required()
    const { error: idsError } = schema.validate(offerIds)
    const { error: pricesError } = schema.validate(prices)
    const isValidPrices = marketService.isValidPrices(prices)

    console.error(isValidPrices)

    if (idsError || pricesError || !isValidPrices) {
        console.error(1)
        return response.emitBadRequest()
    }

    marketService.setMassPrice({ user, offerIds, prices })
        .then(updatedOffers => response.send({ updatedOffers }))
        .catch((e) => {
            console.error(e)
            response.emitUnprocessableEntity()
        })
}

const massRemove = (request, response) => {
    const { user } = request
    const { offerIds } = request.body
    const schema = joi.array().required()
    const { error } = schema.validate(offerIds)

    if (error) {
        return response.emitBadRequest()
    }

    marketService.removeUserOffers({ user, offerIds })
        .then(removedOffersCount => response.send({ removedOffersCount }))
        .catch((e) => {
            console.log(e)
            response.emitUnprocessableEntity()
        })
}

export const marketController = {
    getUserOffers,
    massRemove,
    massUpdate,
    massCreate
}
