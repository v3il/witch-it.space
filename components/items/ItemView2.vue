<template>
  <div
    class="wit-position--relative wit-item-view__container wit-flex wit-flex--align-center wit-cursor--pointer wit-block--full-width wit-paddings--xs"
    @click.exact="onItemClicked"
    @click.shift="onShiftClick"
  >
    <b-field class="wit-offset-bottom--none">
      <b-checkbox />
    </b-field>

    <!--    <div class="wit-position&#45;&#45;relative wit-flex wit-flex&#45;&#45;column1">-->
    <img
      v-tooltip="tooltip"
      :src="itemPreviewURL"
      :alt="item.name"
      :class="itemClasses"
      class="wit-item-view__image wit-block wit-offset-right--xs"
      loading="lazy"
    >

    <p v-if="addTitle" class="wit-text--center1 wit-offset-bottom--xs1 wit-offset-top--xs1 wit-item-view__title wit-line-height--sm wit-offset-right--sm">
      {{ item.name }}
    </p>

    <div class="wit-item-view__counter wit-offset-right--xlg wit-text--right" style="width: 88px;">
      99
    </div>

    <ItemTags :item="item" class="wit-offset-bottom--none wit-offset-right--lg wit-flex__item--grow1" style="width: 300px;" only-primary />
    <!--    </div>-->
    <slot />

    <SelectedItemOverlay v-if="isSelected" />
  </div>
</template>

<script>
import { buildItemUrl } from '@/utils'
import SelectedItemOverlay from '@/components/items/SelectedItemOverlay.vue'
import ItemTags from '@/components/items/ItemTags.vue'

export default {
    name: 'ItemView2',

    components: {
        SelectedItemOverlay,
        ItemTags
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
                    'wit-item-view--bordered': 1 || this.addBorder
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
    //position: absolute;
    //top: 0;
    //right: 0;
    //color: var(--white);
    //padding: 0 2px;
    //border-bottom-left-radius: var(--offset-xxs);
    //font-size: 11px;
}

.wit-item-view__container {
    width: 100%;

    --bg-color: transparent;
    --color: #2e3648;

    border-radius: var(--offset-xxs);

    //.wit-item-view__counter {
    //    background-color: var(--bg-color);
    //    color: var(--white);
    //}

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
    //height: 36px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    //text-align: center;
    flex: 1;
    //max-width: 300px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.wit-item-view__image {
    width: 100%;
    max-width: 56px;
    max-height: 56px;
    aspect-ratio: 1;
    min-height: 25px;
    //border-radius: var(--offset-xxs) var(--offset-xxs) 0 0;

    &.wit-item-view--bordered {
        border: 2px solid var(--bg-color);
    }

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

    &:last-child {
        border-radius: var(--offset-xxs);
    }
}
</style>
