export class Item {
    static create (itemData) {
        return new Item(itemData)
    }

    constructor (itemData) {
        this.id = itemData.itemId
        this.itemId = itemData.itemId
        this.name = itemData.name
        this.description = itemData.description
        this.slot = itemData.slot
        this.rarity = itemData.rarity
        this.event = itemData.event
        this.createdDate = itemData.createdDate
        this.character = itemData.character
        this.isTradable = itemData.isTradable
        this.originalQuality = itemData.quality
    }

    get quality () {
        return this.isRecipe ? this.originalQuality : this.originalQuality + 0.5
    }

    get isRecipe () {
        return this.slot === 'recipe'
    }

    toJSON () {
        return { ...this }
    }
}
