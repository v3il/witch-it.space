<template>
  <div class="aaa wit-paddings--sm1 wit-flex wit-flex--column wit-flex--align-center" :class="itemClass" @click="$emit('click')">
    <div class="wit-offset-right--xs1 wit-paddings--xs1 wit-offset-bottom--xs">
      <ItemView :item="item" :is-title-shown="false" style="border: 0;" />
    </div>

    <p class="wit-offset-bottom--xs wit-line-height--sm">
      {{ item.name }}
    </p>

    <div class="wit-item-view wit-cursor--pointer wit-flex wit-flex--column wit-flex--align-start wit-flex__item--grow">
      <div class="wit-aaa wit-flex__item--grow1">
        <template v-if="wishlistItem.prices.length">
          <ItemPrice
            v-for="price in wishlistItem.prices"
            :key="price.id"
            :price="price"
            class="wit-offset-bottom--xs1 pv wit-paddings--xs1"
          />
        </template>

        <p v-else class="wit-text--center wit-line-height--md wit-color--muted wit-font-size--xxs">
          No specific prices for this item
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView'
import ItemPrice from '@/components/items/ItemPrice'
import { raritiesManager } from '@/shared'
import { buildItemUrl } from '@/utils'
import Card from '@/components/basic/Card.vue'

export default {
    name: 'WishlistItemView',

    components: {
        ItemView,
        ItemPrice
        // Card
    },

    props: {
        wishlistItem: {
            type: Object,
            required: true
        }
    },

    data: () => ({
        item: {}
    }),

    computed: {
        itemClass () {
            const rarity = raritiesManager.find(this.item.rarity)
            return `wit-item-view--${rarity?.value}`
        },

        itemPreviewURL () {
            return buildItemUrl(this.item.name)
        }
    },

    created () {
        console.error(this.wishlistItem)

        this.item = this.$store.state.items.items[this.wishlistItem.itemId] // this.$itemsService.getById(this.wishlistItem.item.id)
    }
}
</script>

<style scoped lang="scss">

.aaa {
    --color: transparent;

    width: 100%;
    //padding: 8px/* 16px 16px*/;
    border-radius: 4px;
    border: 1px solid var(--color);
    cursor: pointer;

    &.wit-item-view--common {
        --color: var(--item-common);
    }

    &.wit-item-view--uncommon {
        --color: var(--item-uncommon);
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

.pv:not(:last-child) {
    border-bottom: 1px solid #36394c;
    padding-bottom: 8px;
    margin-bottom: 8px;
}

.wit-aaa {
    padding: 0 8px;
}
</style>
