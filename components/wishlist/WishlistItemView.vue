<template>
  <div style="border: 1px solid #36394c; /*background-color: rgb(34 39 54);*/" class="aaa wit-paddings--sm wit-flex wit-flex--column" :class="itemClass">
    <p class="wit-offset-bottom--xs wit-line-height--sm">
      {{ item.name }}
    </p>
    <div class="wit-item-view wit-cursor--pointer wit-flex wit-flex__item--grow">
      <div style="flex: 1 0 70px; max-width: 70px;" class="wit-offset-right--xs wit-paddings--xs1">
        <ItemView :item="item" :is-title-shown="false" />
      </div>

      <div class="wit-aaa wit-flex__item--grow" style="border-left: 1px solid #36394c;">
        <p class="wit-font-size--xs wit-offset-bottom--xs">
          I offer:
        </p>

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
import Card from '@/components/Card'

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
            return `wit-item-view--${rarity.value}`
        },

        itemPreviewURL () {
            return buildItemUrl(this.item.name)
        }
    },

    created () {
        this.item = this.$itemsService.getById(this.wishlistItem.itemId)

        console.log(this.item)
    }
}
</script>

<style scoped>
    .aaa {
        width: 275px;
        padding: 8px 16px;
        border-radius: 8px;
        min-height: 220px;
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
