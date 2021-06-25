export class RaritiesManager {
    #rarities = [
        { value: 'whimsical', label: 'Whimsical' },
        { value: 'veryrare', label: 'Very rare' },
        { value: 'rare', label: 'Rare' },
        { value: 'uncommon', label: 'Uncommon' },
        { value: 'common', label: 'Common' },
        { value: 'unlock', label: 'Unlock' },
        { value: 'eventrarity', label: 'Event' },
        { value: 'promo', label: 'Promo' }
    ]

    find (value) {
        return this.#rarities.find(rarity => rarity.value === value)
    }

    getAll () {
        return this.#rarities
    }
}
