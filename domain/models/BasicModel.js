import Vue from 'vue'

export class BasicModel {
    originalModel = null
    changedModel = null

    static create ({ rawModel }) {
        return new this({ originalModel: rawModel })
    }

    constructor ({ originalModel }) {
        this.originalModel = originalModel
    }

    startEditing () {
        this.changedModel = Vue.observable(this.originalModel)
    }

    cancelChanges () {
        this.changedModel = null
    }

    get hasChanges () {
        return JSON.stringify(this.originalModel) === JSON.stringify(this.changedModel)
    }
}
