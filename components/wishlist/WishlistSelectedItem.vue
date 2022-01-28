<template>
  <div class="wit-flex wit-flex--column wit-flex--align-start wit-block--full-width">
    <div class="wit-flex wit-flex--align-start wit-block--full-width">
      <ItemView :item="wishlistItem.item" :is-title-shown="false" style="max-width: 50px;" class="wit-offset-right--sm" />

      <div class="wit-flex wit-flex--column wit-block--full-width wit-offset-bottom--xs">
        <div class="wit-flex wit-flex--align-center1 wit-offset-bottom--xs">
          <p class="wit-font-size--sm wit-offset-right--xs wit-flex__item--grow">
            {{ wishlistItem.item.name }}
          </p>

          <!--          <RemoveButton />-->
          <!--          <b-button size="is-small" type="is-danger is-light">-->
          <!--            Remove-->
          <!--          </b-button>-->
        </div>

        <ItemTags :item="wishlistItem.item" only-primary class="wit-offset-bottom--none" />
      </div>
    </div>

    <div class="wit-block--full-width">
      <PriceEditor
        v-for="price in wishlistItem.prices"
        :key="price.id"
        :price="price"
        :is-removeable="isAllPricesAdded"
        class="wit-price-editor wit-block--full-width"
        @priceTypeChanged="onPriceTypeChanged"
        @priceRemoved="onPriceRemoved"
      />
    </div>

    <div class="wit-flex wit-flex--justify-between wit-block--full-width">
      <b-button size="is-small" type="is-danger">
        {{ $t('Wishlist_RemoveFromWishlist') }}
      </b-button>

      <div class="wit-flex wit-flex--align-center">
        <b-button v-if="!isAllPricesAdded" size="is-small" type="is-primary" class="wit-offset-right--sm">
          {{ $t('Wishlist_AddPrice') }}
        </b-button>

        <b-button size="is-small" type="is-danger is-light">
          {{ $t('Wishlist_Remove') }}
        </b-button>
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
    name: 'WishlistSelectedItem',

    components: {
        ItemView,
        ItemTags,
        PriceEditor,
        ItemPrice,
        RemoveButton
    },

    props: {
        wishlistItem: {
            type: Object,
            required: true
        }
    },

    computed: {
        isAllPricesAdded () {
            return this.wishlistItem.prices.length === config.MAX_PRICES
        }
    },

    methods: {
        onPriceTypeChanged ({ price, priceType }) {
            this.wishlistItem.setPriceType(price, priceType)
        },

        onPriceRemoved ({ price }) {
            this.wishlistItem.removePrice(price)
        },

        onaaa ({ target }) {
            this.wishlistItem.aaa(target.value)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-price-editor {
    &:not(:last-child) {
        //border-bottom: var(--default-border);
    }
}

.zzz {
    background-color: var(--danger);
    color: white;
    border-radius: 50%;
    height: 18px;
    width: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        font-size: 12px;
        line-height: 18px;
    }
}
</style>
