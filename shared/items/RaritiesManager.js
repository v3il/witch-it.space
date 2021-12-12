import { Rarity } from './Rarity'

export class RaritiesManager {
    #rarities = [
        { value: Rarity.WHIMSICAL, label: 'Whimsical' },
        { value: Rarity.VERY_RARE, label: 'Very rare' },
        { value: Rarity.RARE, label: 'Rare' },
        { value: Rarity.UNCOMMON, label: 'Uncommon' },
        { value: Rarity.COMMON, label: 'Common' },
        { value: Rarity.UNLOCK, label: 'Unlock' },
        { value: Rarity.EVENT, label: 'Event' },
        { value: Rarity.PROMO, label: 'Promo' }
    ]

    find (value) {
        return this.#rarities.find(rarity => rarity.value === value)
    }

    getAll () {
        return this.#rarities
    }
}
