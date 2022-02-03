<template>
  <div class="wit-flex wit-flex--column wit-flex--align-start wit-block--full-width">
    <div class="wit-flex wit-flex--align-start wit-block--full-width wit-offset-bottom--xs">
      <ItemView :item="wishlistItem.item" :is-title-shown="false" style="max-width: 55px;" class="wit-offset-right--sm" />

      <div class="wit-flex wit-flex--column wit-block--full-width wit-offset-bottom--xs">
        <div class="wit-flex wit-flex--align-center1 wit-offset-bottom--xs">
          <p class="wit-font-size--sm wit-offset-right--xs1 wit-flex__item--grow">
            {{ wishlistItem.item.name }}
          </p>
        </div>

        <div class="wit-flex wit-flex--justify-between1 wit-block--full-width">
          <!--          <b-button size="is-small" type="is-danger is-light">-->
          <!--            {{ $t('Wishlist_RemoveFromWishlist') }}-->
          <!--          </b-button>-->

          <b-button v-if="!isAllPricesAdded" size="is-small" type="is-primary" @click="addPrice">
            {{ $t('Wishlist_AddPrice') }}
          </b-button>

          <div class="wit-flex wit-flex--align-center wit-offset-left--auto">
            <b-button v-tooltip="'Remove from wishlist'" size="is-small" type="is-ghost" class="wit-paddings--none wit-offset-right--sm">
              <i class="mdi mdi-24px mdi-heart-off wit-color--danger" />
            </b-button>

            <b-button v-tooltip="{ content: 'Remove', boundariesElement: 'body' }" size="is-small" type="is-ghost" class="wit-paddings--none wit-offset-right--sm1">
              <i class="mdi mdi-24px mdi-trash-can-outline wit-color--danger" />
            </b-button>

            <!--            <b-button size="is-small" type="is-danger is-light" @click="removeItem">-->
            <!--              {{ $t('Wishlist_Remove') }}-->
            <!--            </b-button>-->
          </div>
        </div>

        <!--        <ItemTags :item="wishlistItem.item" only-primary class="wit-offset-bottom&#45;&#45;none" />-->
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

        addPrice () {
            const newPrice = this.$priceService.createDefaultPrice()
            this.wishlistItem.addPrice(newPrice)
        },

        removeItem () {
            this.$emit('itemRemoved', this.wishlistItem)
        }
    }
}
</script>

<!--<style scoped lang="scss">-->
<!--.wit-price-editor {-->
<!--    &:not(:last-child) {-->
<!--        //border-bottom: var(&#45;&#45;default-border);-->
<!--    }-->
<!--}-->

<!--.zzz {-->
<!--    background-color: var(&#45;&#45;danger);-->
<!--    color: white;-->
<!--    border-radius: 50%;-->
<!--    height: 18px;-->
<!--    width: 18px;-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--    justify-content: center;-->

<!--    &::before {-->
<!--        font-size: 12px;-->
<!--        line-height: 18px;-->
<!--    }-->
<!--}-->
<!--</style>-->
