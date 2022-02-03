<template>
  <div class="wit-flex wit-flex--column wit-flex--align-start wit-block--full-width">
    <div class="wit-flex wit-flex--align-start wit-block--full-width wit-offset-bottom--xs">
      <ItemView add-tooltip :item="wishlistItem.item" :is-title-shown="false" style="max-width: 58px;" class="wit-offset-right--sm wit-flex__item--no-shrink" />

      <div class="wit-flex__item--grow" style="flex: 1 1 auto; min-width: 0;">
        <div class="wit-flex wit-flex--column wit-block--full-width wit-offset-bottom--xs">
          <div class="wit-flex wit-flex--align-center wit-offset-bottom--xs">
            <p class="wit-font-size--sm wit-offset-right--xs1 wit-flex__item--grow wit-text--overflow">
              {{ wishlistItem.item.name }}
            </p>

            <div class="wit-flex wit-flex--align-center wit-offset-left--md wit-flex__item--no-shrink" style="margin-right: -4px;">
              <!--            <b-button v-tooltip="'Add price'" size="is-small" type="is-ghost" class="wit-paddings&#45;&#45;none wit-offset-right&#45;&#45;sm">-->
              <!--              <i class="mdi mdi-24px mdi-database-plus wit-color&#45;&#45;primary" />-->
              <!--            </b-button>-->

              <b-button v-tooltip="'Remove from wishlist'" size="is-small" type="is-ghost" class="wit-paddings--none wit-offset-right--sm">
                <i class="mdi mdi-24px mdi-heart-off wit-color--danger" />
              </b-button>

              <b-button v-tooltip="'Remove'" size="is-small" type="is-ghost" class="wit-paddings--none wit-offset-right--sm1">
                <i class="mdi mdi-24px mdi-trash-can-outline wit-color--danger" />
              </b-button>

              <!--            <b-button size="is-small" type="is-danger is-light" @click="removeItem">-->
              <!--              {{ $t('Wishlist_Remove') }}-->
              <!--            </b-button>-->
            </div>
          </div>

          <!--          <div class="wit-flex wit-flex&#45;&#45;justify-between1 wit-block&#45;&#45;full-width">-->
          <!--            &lt;!&ndash;          <b-button size="is-small" type="is-danger is-light">&ndash;&gt;-->
          <!--            &lt;!&ndash;            {{ $t('Wishlist_RemoveFromWishlist') }}&ndash;&gt;-->
          <!--            &lt;!&ndash;          </b-button>&ndash;&gt;-->

          <!--            <b-button v-if="0 && !isAllPricesAdded" size="is-small" type="is-primary" @click="addPrice">-->
          <!--              {{ $t('Wishlist_AddPrice') }}-->
          <!--            </b-button>-->

          <!--            &lt;!&ndash;          <div class="wit-flex wit-flex&#45;&#45;align-center wit-offset-left&#45;&#45;auto">&ndash;&gt;-->
          <!--            &lt;!&ndash;            &lt;!&ndash;            <b-button v-tooltip="'Add price'" size="is-small" type="is-ghost" class="wit-paddings&#45;&#45;none wit-offset-right&#45;&#45;sm">&ndash;&gt;&ndash;&gt;-->
          <!--            &lt;!&ndash;            &lt;!&ndash;              <i class="mdi mdi-24px mdi-database-plus wit-color&#45;&#45;primary" />&ndash;&gt;&ndash;&gt;-->
          <!--            &lt;!&ndash;            &lt;!&ndash;            </b-button>&ndash;&gt;&ndash;&gt;-->

          <!--            &lt;!&ndash;            <b-button v-tooltip="'Remove from wishlist'" size="is-small" type="is-ghost" class="wit-paddings&#45;&#45;none wit-offset-right&#45;&#45;sm">&ndash;&gt;-->
          <!--            &lt;!&ndash;              <i class="mdi mdi-24px mdi-heart-off wit-color&#45;&#45;danger" />&ndash;&gt;-->
          <!--            &lt;!&ndash;            </b-button>&ndash;&gt;-->

          <!--            &lt;!&ndash;            <b-button v-tooltip="'Remove'" size="is-small" type="is-ghost" class="wit-paddings&#45;&#45;none wit-offset-right&#45;&#45;sm1">&ndash;&gt;-->
          <!--            &lt;!&ndash;              <i class="mdi mdi-24px mdi-trash-can-outline wit-color&#45;&#45;danger" />&ndash;&gt;-->
          <!--            &lt;!&ndash;            </b-button>&ndash;&gt;-->

          <!--            &lt;!&ndash;            &lt;!&ndash;            <b-button size="is-small" type="is-danger is-light" @click="removeItem">&ndash;&gt;&ndash;&gt;-->
          <!--            &lt;!&ndash;            &lt;!&ndash;              {{ $t('Wishlist_Remove') }}&ndash;&gt;&ndash;&gt;-->
          <!--            &lt;!&ndash;            &lt;!&ndash;            </b-button>&ndash;&gt;&ndash;&gt;-->
          <!--            &lt;!&ndash;          </div>&ndash;&gt;-->
          <!--          </div>-->

          <ItemTags :item="wishlistItem.item" only-primary class="wit-offset-bottom--none" />
        </div>
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

    <b-button
      v-if="!isAllPricesAdded"
      size="is-small1"
      type="is-primary is-light"
      expanded
      class="wit-offset-bottom--sm"
      style="background: transparent; border: 1px dashed var(--primary); color: var(--muted-text-color);"
      @click="addPrice"
    >
      <div class="wit-flex wit-flex--center wit-color--white">
        <i class="mdi mdi-24px mdi-plus wit-offset-right--xxs" />
        <!--        Price-->
      </div>
      <!--      {{ // $t('Wishlist_AddPrice') }}-->
    </b-button>
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
