<template>
  <div>
    <h3 class="wit-offset-bottom--xs">
      Rarities
    </h3>

    <ul class="wis-rarities wit-flex">
      <li v-for="rarity in $options.rarities" :key="rarity.value" class="wis-rarities__item">
        <b-button type="is-primary" class="wis-rarities__button" :class="getButtonClass(rarity)" />
      </li>
    </ul>
  </div>
</template>

<script>
import { raritiesManager } from '@/shared/index.js'

export default {
    name: 'RaritiesSelector',

    rarities: raritiesManager.getTradeable(),

    props: {
        selectedRarities: {
            required: true,
            type: Array
        }
    },

    methods: {
        getButtonClass (rarity) {
            return [
                `wis-rarities__button--${rarity.value}`,
                { active: this.selectedRarities.includes(rarity.value) }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
.wis-rarities__item {
    &:not(:last-child) {
        margin-right: var(--offset-xs);
    }
}

.wis-rarities__button {
    --bg-color: transparent;

    width: var(--offset-lg);
    height: var(--offset-lg);
    border-radius: 50%;
    padding: 0;
    background-color: var(--bg-color);
    border: 2px solid var(--bg-color);

    &:hover {
        transform: none;
        background-color: var(--bg-color);
        opacity: 0.8;
    }

    &.active {
        border-color: var(--light-green);
    }
}

.wis-rarities__button--whimsical {
    --bg-color: var(--item-whimsical);
}

.wis-rarities__button--veryrare {
    --bg-color: var(--item-very-rare);
}

.wis-rarities__button--rare {
    --bg-color: var(--item-rare);
}

.wis-rarities__button--uncommon {
    --bg-color: var(--item-uncommon);
}

.wis-rarities__button--common {
    --bg-color: var(--item-common);
}
</style>
