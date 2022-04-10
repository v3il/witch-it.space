<template>
  <div class="wit-flex wit-flex--column1 wit-flex--align-start wit-block--full-width">
    <ItemView
      add-tooltip
      :item="offer.item"
      :is-title-shown="false"
      style="max-width: 88px;"
      class="wit-overflow--hidden wit-offset-right--sm wit-flex__item--no-shrink"
    />

    <div class="wit-flex__item--grow wit-flex wit-flex--column" style="min-width: 0;">
      <p class="wit-flex__item--grow wit-text--overflow wit-font-size--sm wit-offset-bottom--xs">
        {{ offer.item.name }}
      </p>

      <ItemTags :item="offer.item" class="wit-offset-bottom--sm" />

      <div class="wit-block--full-width">
        <p class="wit-offset-bottom--xs">
          I offer:
        </p>

        <PricesEditor :prices="offer.prices" @update="onPricesUpdate" />
      </div>
    </div>
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView.vue'
import ItemTags from '@/components/items/ItemTags.vue'
import PriceEditor from '@/components/price/PriceEditor.vue'
import ItemPrice from '@/components/items/ItemPrice.vue'
import RemoveButton from '@/components/basic/RemoveButton.vue'
import PricesEditor from '@/components/price/PricesEditor.vue'

export default {
    name: 'WishlistOfferEditor',

    components: {
        ItemView,
        ItemTags,
        PriceEditor,
        ItemPrice,
        RemoveButton,
        PricesEditor
    },

    props: {
        offer: {
            type: Object,
            required: true
        }
    },

    methods: {
        onPricesUpdate (prices) {
            this.offer.setPrices(prices)
        }
    }
}
</script>
