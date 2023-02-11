import { Rarity } from './Rarity'

export class RaritiesManager {
    #rarities = [
        { value: Rarity.WHIMSICAL, label: 'Whimsical', isTradeable: true },
        { value: Rarity.VERY_RARE, label: 'Very rare', isTradeable: true },
        { value: Rarity.RARE, label: 'Rare', isTradeable: true },
        { value: Rarity.UNCOMMON, label: 'Uncommon', isTradeable: true },
        { value: Rarity.COMMON, label: 'Common', isTradeable: true },
        { value: Rarity.UNLOCK, label: 'Unlock', isTradeable: false },
        { value: Rarity.EVENT, label: 'Event', isTradeable: false },
        { value: Rarity.PROMO, label: 'Promo', isTradeable: false }
    ]

    find (value) {
        return this.#rarities.find(rarity => rarity.value === value)
    }

    getAll () {
        return this.#rarities
    }

    getTradeable () {
        return this.#rarities.filter(rarity => rarity.isTradeable)
    }

    isLightRarity (rarity) {
        return [Rarity.RARE, Rarity.UNCOMMON].includes(rarity.value)
    }
}
