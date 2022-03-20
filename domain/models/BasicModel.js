import Vue from 'vue'
import { cloneDeep } from 'lodash'

export class BasicModel {
    originalModel = null
    changedModel = null

    // static create ({ rawModel }) {
    //     return new this({ originalModel: rawModel })
    // }

    constructor ({ originalModel }) {
        this.originalModel = originalModel
        this.changedModel = Vue.observable(cloneDeep(this.originalModel))
    }

    startEditing () {
        this.changedModel = Vue.observable(cloneDeep(this.originalModel))
    }

    cancelChanges () {
        // this.changedModel = null
    }

    get hasChanges () {
        console.log(JSON.stringify(this.originalModel) === JSON.stringify(this.changedModel))
        return JSON.stringify(this.originalModel) !== JSON.stringify(this.changedModel)
    }
}
