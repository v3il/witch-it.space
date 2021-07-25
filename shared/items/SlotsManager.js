export class SlotsManager {
    #slots = [
        { value: 'upper body', label: 'Upper Body' },
        { value: 'lower body', label: 'Lower Body' },
        { value: 'melee weapon', label: 'Melee Weapon' },
        { value: 'skin color', label: 'Skin Color' },
        { value: 'player icon', label: 'Player Icon' },
        { value: 'ingredient', label: 'Ingredient' },
        { value: 'hat', label: 'Hat' },
        { value: 'head', label: 'Head' },
        { value: 'body', label: 'Body' },
        { value: 'projectile', label: 'Projectile' },
        { value: 'broom', label: 'Broom' }
    ]

    find (value) {
        return this.#slots.find(rarity => rarity.value === value)
    }

    getAll () {
        return this.#slots
    }
}
