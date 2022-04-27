<template>
  <div>
    <div class="wit-offset-bottom--xxs wit-flex wit-flex--align-center">
      <h3>
        {{ $t('Items_Filters_Rarity') }}
      </h3>

      <p v-if="!isAllRaritiesSelected" class="wit-color--muted wit-offset-left--xs">
        ({{ selectedRaritiesLength }}/{{ $options.rarities.length }})
      </p>

      <b-button type="is-ghost" size="is-small" class="wit-offset-left--auto" @click="$emit('reset')">
        <b-icon size="is-small" class="is-size-5 wit-color--muted" icon="undo-variant" />
      </b-button>
    </div>

    <ul class="wis-rarities wit-flex">
      <li v-for="rarity in $options.rarities" :key="rarity.value" class="wis-rarities__item">
        <b-button type="is-primary" class="wis-rarities__button" :class="getButtonClass(rarity)" @click="toggleRarity(rarity)" />
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

    computed: {
        selectedRaritiesLength () {
            return this.selectedRarities.length > 0 ? this.selectedRarities.length : this.$options.rarities.length
        },

        isAllRaritiesSelected () {
            return this.selectedRaritiesLength === this.$options.rarities.length
        }
    },

    methods: {
        getButtonClass (rarity) {
            return [
                `wis-rarities__button--${rarity.value}`,
                {
                    active: this.isSelectedRarity(rarity),
                    light: raritiesManager.isLightRarity(rarity)
                }
            ]
        },

        isSelectedRarity (rarity) {
            return this.selectedRarities.includes(rarity.value)
        },

        toggleRarity (rarity) {
            if (!this.isSelectedRarity(rarity)) {
                return this.$emit('update', [...this.selectedRarities, rarity.value])
            }

            this.$emit('update', this.selectedRarities.filter(rarityValue => rarityValue !== rarity.value))
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

    width: 28px;
    height: 28px;
    border-radius: 50%;
    padding: 0;
    background-color: var(--bg-color);
    box-shadow: none !important;

    &:hover {
        transform: none;
        background-color: var(--bg-color);
        opacity: 0.8;
    }

    &.active::after {
        content: "✓";
        color: var(--white);
        font-weight: bold;
    }

    &.light.active::after {
        content: "✓";
        color: var(--black);
        font-weight: bold;
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
