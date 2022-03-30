import Vue from 'vue'
import { cloneDeep } from 'lodash'
import { BasicModel } from './BasicModel.js'
import { Price } from '@/domain/models/Price.js'
import { itemsService } from '@/domain/index.js'

export class Offer {
    static create (offerData) {
        const offer = cloneDeep(offerData)

        console.log(111, offerData)

        if (!offer.prices) {
            offer.prices = (offer.rawPrices || []).map(price => Price.create({ price }))
        }

        if (offer.item) {
            offer.itemId = offer.item.id
        } else {
            offer.item = itemsService.getById(offer.itemId)
        }

        return new Offer(offer)
    }

    originalModel

    constructor (offerData) {
        this.originalModel = offerData
    }

    get id () {
        return this.originalModel.id
    }

    get item () {
        return this.originalModel.item
    }

    get prices () {
        return this.originalModel.prices
    }

    get isNew () {
        return !this.id
    }

    get isRecipe () {
        return false
    }

    buildOutput () {
        const rawPrices = this.prices.map(priceModel => priceModel.buildOutput())

        return {
            id: this.id,
            itemId: this.item.id,
            rawPrices
        }
    }

    // getData () {
    //     const rawPrices = this.changedPrices.map(priceModel => priceModel.getData())
    //
    //     return {
    //         id: this.id,
    //         itemId: this.item.id,
    //         rawPrices
    //     }
    // }

    update (updatedData) {
        this.originalModel.id = updatedData.id
        this.originalModel.prices = updatedData.prices
        // this.changedModel = Vue.observable(cloneDeep(this.originalModel))
    }

    setPrices (prices) {
        this.originalModel.prices = prices
    }

    clone () {
        return new Offer({ originalModel: this.originalModel })
    }

    // Changed

    // get changedPrices () {
    //     return this.changedModel.prices
    // }
    //
    // addPrice (price) {
    //     this.changedModel.prices.push(price)
    // }
    //
    // removePrice (priceToRemove) {
    //     this.changedModel.prices = this.changedModel.prices.filter(price => price !== priceToRemove)
    // }

    // setPrices (prices) {
    //     this.changedModel.prices = prices
    // }
}
