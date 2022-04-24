<template>
  <div
    class="wit-position--relative wit-item-view__container wit-flex wit-flex--column wit-cursor--pointer wit-block--full-width"
    :class="itemClasses"
    @click.exact="onItemClicked"
    @click.shift="onShiftClick"
  >
    <div class="wit-flex wit-position--relative wit-flex wit-flex--column">
      <img
        v-tooltip="tooltip"
        :src="itemPreviewURL"
        :alt="item.name"
        class="wit-item-view__image wit-block"
        loading="lazy"
      >
      <div v-if="itemCount > 0" class="wit-item-view__counter">
        x{{ itemCount }}
      </div>

      <p v-if="addTitle" class="wit-text--center wit-offset-bottom--xs wit-offset-top--xs wit-item-view__title wit-line-height--sm">
        {{ item.name }}
      </p>
    </div>
    <slot />

    <SelectedItemOverlay v-if="isSelected" />
  </div>
</template>

<script>
import { buildItemUrl } from '@/utils'
import SelectedItemOverlay from '@/components/items/SelectedItemOverlay.vue'

export default {
    name: 'ItemView',

    components: {
        SelectedItemOverlay
    },

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

        addTooltip: {
            required: false,
            type: Boolean,
            default: false
        },

        addBorder: {
            required: false,
            type: Boolean,
            default: false
        },

        addTitle: {
            required: false,
            type: Boolean,
            default: false
        },

        isSelected: {
            required: false,
            type: Boolean,
            default: false
        }
    },

    computed: {
        itemClasses () {
            return [
                `wit-item-view--${this.item.rarity}`,
                {
                    'wit-item-view--bordered': this.addBorder
                }
            ]
        },

        itemPreviewURL () {
            return buildItemUrl(this.item.id)
        },

        tooltip () {
            return this.addTooltip ? this.item.name : null
        }
    },

    methods: {
        onItemClicked () {
            this.$emit('clicked', this.item)
        },

        onShiftClick () {
            this.$emit('shiftClick', this.item)
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
    --bg-color: transparent;
    --color: #2e3648;

    border-radius: var(--offset-xxs);

    .wit-item-view__counter {
        background-color: var(--bg-color);
        color: var(--white);
    }

    &.wit-item-view--common {
        --bg-color: var(--item-common);
        --color: var(--white);
    }

    &.wit-item-view--uncommon {
        --bg-color: var(--item-uncommon);
    }

    &.wit-item-view--promo {
        --bg-color: var(--item-promo);
    }

    &.wit-item-view--eventrarity {
        --bg-color: var(--item-event);
    }

    &.wit-item-view--unlock {
        --bg-color: var(--item-unlock);
    }

    &.wit-item-view--rare {
        --bg-color: var(--item-rare);
    }

    &.wit-item-view--veryrare {
        --bg-color: var(--item-very-rare);
        --color: var(--white);
    }

    &.wit-item-view--whimsical {
        --bg-color: var(--item-whimsical);
        --color: var(--white);
    }
}

.wit-item-view__container.wit-item-view--bordered {
    border: 2px solid var(--bg-color);
}

.wit-item-view__title {
    padding: 0 var(--offset-xs);
    height: 36px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    text-align: center;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.wit-item-view__image {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 1;
    min-height: 25px;
    border-radius: var(--offset-xxs) var(--offset-xxs) 0 0;

    &:last-child {
        border-radius: var(--offset-xxs);
    }
}
</style>
