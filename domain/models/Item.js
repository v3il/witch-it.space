export class Item {
    #originalQuality

    static create (itemData) {
        return new Item(itemData)
    }

    constructor (itemData) {
        this.id = itemData.itemId
        this.name = itemData.name
        this.description = itemData.description
        this.slot = itemData.slot
        this.isTradable = itemData.isTradable
        this.#originalQuality = itemData.quality
    }

    get quality () {
        return this.#originalQuality
    }

    get isRecipe () {
        return this.slot === 'recipe'
    }
}
