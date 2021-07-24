export class ItemTypesManager {
    #itemTypes = [
        { value: 'veryrare', label: 'Very rare' },
        { value: 'whimsical', label: 'Whimsical' },
        { value: 'rare', label: 'Rare' },
        { value: 'common', label: 'Common' },
        { value: 'uncommon', label: 'Uncommon' },
        { value: 'unlock', label: 'Unlock' },
        { value: 'promo', label: 'Promo' },
        { value: 'eventrarity', label: 'Event' }
    ]

    find (value) {
        return this.#itemTypes.find(rarity => rarity.value === value)
    }

    getAll () {
        return this.#itemTypes
    }
}
