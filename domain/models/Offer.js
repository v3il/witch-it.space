import Vue from 'vue'
import { cloneDeep } from 'lodash'
import { BasicModel } from './BasicModel.js'

export class Offer extends BasicModel {
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
        return this.item.slot === 'recipe'
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
