<template>
  <div class="wit-flex wit-flex--column1 wit-flex--align-start wit-block--full-width">
    <ItemView add-tooltip :item="offer.item" :is-title-shown="false" style="max-width: 88px;" class="wit-overflow--hidden wit-offset-right--sm wit-flex__item--no-shrink">
      <div v-if="offer.isNew" class="new-label">
        NEW
      </div>
    </ItemView>

    <div class="wit-flex__item--grow wit-flex wit-flex--column" style="min-width: 0;">
      <p class="wit-flex__item--grow wit-text--overflow wit-font-size--sm wit-offset-bottom--xs">
        {{ offer.item.name }}
      </p>

      <ItemTags :item="offer.item" class="wit-offset-bottom--sm" />

      <div class="wit-block--full-width">
        <p class="wit-offset-bottom--xs">
          I offer:
        </p>

        <PriceEditor
          v-for="price in offer.changedPrices"
          :key="price.id"
          :price="price"
          :is-removable="hasOnePrice"
          class="wit-price-editor wit-block--full-width"
          @priceTypeChanged="onPriceTypeChanged"
          @priceRemoved="onPriceRemoved"
          @priceAdded="addPrice"
        />
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
import { config } from '@/shared/index.js'

export default {
    name: 'WishlistOfferEditor',

    components: {
        ItemView,
        ItemTags,
        PriceEditor,
        ItemPrice,
        RemoveButton
    },

    props: {
        offer: {
            type: Object,
            required: true
        }
    },

    computed: {
        isAllPricesAdded () {
            return this.offer.changedPrices.length >= config.MAX_PRICES
        },

        hasOnePrice () {
            return this.offer.changedPrices.length > 1
        }
    },

    methods: {
        onPriceTypeChanged ({ price, priceType }) {
            this.offer.setPriceType(price, priceType)
        },

        onPriceRemoved ({ price }) {
            this.offer.removePrice(price)
        },

        addPrice () {
            const newPrice = this.$priceService.createDefaultPrice()
            this.offer.addPrice(newPrice)
        }
    }
}
</script>

<style scoped lang="scss">
.new-label {
    position: absolute;
    top: 4px;
    right: -15px;
    transform: rotate(45deg);
    font-size: 10px;
    background: var(--bg-color);
    padding: 1px 15px;
    color: var(--color);
    font-weight: 500;
}
</style>
