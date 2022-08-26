import { PRIMARY, SECONDARY, SortOrders } from '@/shared/items/index.js'
import { Item } from '@/domain/models'

export class ItemsService {
    #items = {}
    #primary = []
    #secondary = []

    setItems (items) {
        items.forEach((itemData) => {
            this.#items[itemData.itemId] = Item.create(itemData)
        })

        this.#primary = PRIMARY.map(id => this.getById(id))
        this.#secondary = SECONDARY.map(id => this.getById(id))
    }

    getById (id) {
        return Object.freeze(this.#items[String(id)])
    }

    get count () {
        return Object.values(this.#items).length
    }

    toList () {
        return Object.values(this.#items)
    }

    getPrimaryIngredients () {
        return this.#primary
    }

    getSecondaryIngredients () {
        return this.#secondary
    }

    getTradableItems () {
        return this.toList().filter(item => item.isTradable)
    }

    checkItem (item, filters) {
        const lowerCasedQuery = filters.query.toLowerCase()

        if (lowerCasedQuery && !item.name.toLowerCase().includes(lowerCasedQuery)) {
            return false
        }

        if (filters.rarities.length && !filters.rarities.includes(item.rarity)) {
            return false
        }

        if (filters.character && item.character !== filters.character) {
            return false
        }

        if (filters.events.length && !filters.events.includes(item.event)) {
            return false
        }

        if (filters.slots.length && !filters.slots.includes(item.slot)) {
            return false
        }

        return true
    }

    compareItems (a, b, sorts) {
        const { sortBy, order } = sorts
        const isAsc = order === SortOrders.ASC
        const firstItem = isAsc ? a : b
        const secondItem = isAsc ? b : a

        switch (sortBy) {
        case 'rarity':
            if (firstItem.quality === secondItem.quality) {
                if (firstItem.isRecipe === secondItem.isRecipe) {
                    return secondItem.id - firstItem.id
                }

                return +secondItem.isRecipe - +firstItem.isRecipe
            }

            return firstItem.quality - secondItem.quality
        case 'name':
            return firstItem.name.localeCompare(secondItem.name)
        }

        return 0
    }
}
