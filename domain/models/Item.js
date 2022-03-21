export class Item {
    #itemData

    static create (itemData) {
        return new Item(itemData)
    }

    constructor (itemData) {
        this.#itemData = itemData
    }

    get id () {
        return this.#itemData.id
    }

    get isRecipe () {
        return 1 // || this.item.slot === 'recipe'
    }
}
