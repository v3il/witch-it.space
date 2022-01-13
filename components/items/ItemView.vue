<template>
  <div class="wit-position--relative wit-item-view__container wit-block--full-height wit-flex wit-flex--column wit-cursor--pointer wit-block--full-width" :class="itemClass" @click="onItemClicked">
    <div class="wit-flex wit-position--relative wit-flex wit-flex--column">
      <img
        :src="itemPreviewURL"
        :alt="item.name"
        :title="item.name"
        class="wit-item-view__image wit-block"
        loading="lazy"
      >
      <div v-if="itemCount > 0" class="wit-item-view__counter">
        x{{ itemCount }}
      </div>

      <p v-if="isTitleShown" class="wit-text--center wit-offset-bottom--xs wit-offset-top--xs wit-item-view__title wit-line-height--sm">
        {{ item.name }}
      </p>
    </div>
    <slot />
  </div>
</template>

<script>
import { buildItemUrl } from '@/utils'
import { raritiesManager } from '@/shared'

export default {
    name: 'ItemView',

    props: {
        item: {
            type: Object,
            required: true
        },

        itemCount: {
            required: false,
            default: 0,
            type: Number
        },

        isTitleShown: {
            required: false,
            type: Boolean,
            default: true
        },

        itemMaxWidth: {
            required: false,
            type: Number,
            default: 100
        }
    },

    computed: {
        itemClass () {
            const rarity = raritiesManager.find(this.item.rarity)
            return `wit-item-view--${rarity.value}`
        },

        itemPreviewURL () {
            return buildItemUrl(this.item.name)
        },

        colWidth () {
            return {
                maxWidth: `${this.itemMaxWidth}px`
            }
        }
    },

    methods: {
        onItemClicked () {
            this.$emit('clicked', this.item)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-item-view {
    width: 100%;
}

.wit-item-view__counter {
    position: absolute;
    top: 0;
    right: 0;
    color: var(--white);
    padding: var(--offset-xxs);
    border-bottom-left-radius: var(--offset-xxs);
    font-weight: bold;
}

.wit-item-view__container {
    --color: transparent;

    border: 1px solid var(--color);
    border-radius: var(--offset-xxs);

    .wit-item-view__counter {
        background-color: var(--color);
        color: var(--white);
    }

    &.wit-item-view--common {
        --color: var(--item-common);
    }

    &.wit-item-view--uncommon {
        --color: var(--item-uncommon);
    }

    &.wit-item-view--promo {
        --color: var(--item-promo);
    }

    &.wit-item-view--eventrarity {
        --color: var(--item-event);
    }

    &.wit-item-view--unlock {
        --color: var(--item-unlock);
    }

    &.wit-item-view--rare {
        --color: var(--item-rare);
    }

    &.wit-item-view--veryrare {
        --color: var(--item-very-rare);
    }

    &.wit-item-view--whimsical {
        --color: var(--item-whimsical);
    }
}

.wit-item-view__title {
    padding: 0 var(--offset-xs);
}

.wit-item-view__image {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: var(--offset-xxs);
    aspect-ratio: 1;
    min-height: 30px;
}
</style>
