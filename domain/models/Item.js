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
        this.rarity = itemData.rarity
        this.isTradable = itemData.isTradable
        this.#originalQuality = itemData.quality
    }

    get quality () {
        return this.isRecipe ? this.#originalQuality : this.#originalQuality + 0.5
    }

    get isRecipe () {
        return this.slot === 'recipe'
    }
}
