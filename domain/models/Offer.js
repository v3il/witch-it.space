import Vue from 'vue'
import { cloneDeep } from 'lodash'
import { BasicModel } from './BasicModel.js'
import { Price } from '@/domain/models/Price.js'
import { itemsService } from '@/domain/index.js'

export class Offer extends BasicModel {
    static create (offerData) {
        offerData.prices = (offerData.rawPrices || []).map(price => Price.create({ price }))

        if (offerData.item) {
            offerData.itemId = offerData.item.id
        } else {
            offerData.item = itemsService.getById(offerData.itemId)
        }

        return new Offer({ originalModel: offerData })
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

    getData () {
        const rawPrices = this.changedPrices.map(priceModel => priceModel.getData())

        return {
            id: this.id,
            itemId: this.item.id,
            rawPrices
        }
    }

    update (updatedData) {
        this.originalModel.id = updatedData.id
        this.originalModel.prices = updatedData.prices
        this.changedModel = Vue.observable(cloneDeep(this.originalModel))
    }

    setPrices (prices) {
        this.originalModel.prices = prices
    }

    clone () {
        return new Offer({ originalModel: this.originalModel })
    }

    // Changed

    get changedPrices () {
        return this.changedModel.prices
    }

    addPrice (price) {
        this.changedModel.prices.push(price)
    }

    removePrice (priceToRemove) {
        this.changedModel.prices = this.changedModel.prices.filter(price => price !== priceToRemove)
    }

    // setPrices (prices) {
    //     this.changedModel.prices = prices
    // }
}
