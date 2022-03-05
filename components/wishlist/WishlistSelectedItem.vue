<template>
  <div class="wit-flex wit-flex--column wit-flex--align-start wit-block--full-width">
    <div class="wit-flex wit-flex--align-start wit-block--full-width wit-offset-bottom--sm">
      <ItemView add-tooltip :item="wishlistItem.item" :is-title-shown="false" style="max-width: 58px;" class="wit-offset-right--sm wit-flex__item--no-shrink" />

      <div class="wit-flex__item--grow" style="flex: 1 1 auto; min-width: 0;">
        <div class="wit-flex wit-flex--column wit-block--full-width wit-offset-bottom--xs1">
          <div class="wit-flex wit-flex--align-center wit-offset-bottom--xs">
            <p class="wit-font-size--sm1 wit-offset-right--xs1 wit-flex__item--grow wit-text--overflow" style="font-size: 16px;">
              {{ wishlistItem.item.name }}
            </p>

            <!--            <p>{{ wishlistItem.isNew }}</p>&nbsp;-->
            <!--            <p>{{ JSON.stringify(wishlistItem.id) }}</p>&nbsp;-->
            <!--            <p>{{ wishlistItem.hasChanges }}</p>-->

            <div class="wit-flex wit-flex--align-center wit-offset-left--xs wit-flex__item--no-shrink">
              <!--            <b-button v-tooltip="'Add price'" size="is-small" type="is-ghost" class="wit-paddings&#45;&#45;none wit-offset-right&#45;&#45;sm">-->
              <!--              <i class="mdi mdi-24px mdi-database-plus wit-color&#45;&#45;primary" />-->
              <!--            </b-button>-->

              <!--              <b-button-->
              <!--                v-if="!wishlistItem.isNew"-->
              <!--                v-tooltip="'Remove from wishlist'"-->
              <!--                size="is-small"-->
              <!--                type="is-ghost"-->
              <!--                class="wit-paddings&#45;&#45;none wit-offset-right&#45;&#45;sm"-->
              <!--                style="width: 20px; height: 20px;"-->
              <!--                @click="$emit('delete', wishlistItem)"-->
              <!--              >-->
              <!--                <i class="mdi mdi-20px mdi-heart-off wit-color&#45;&#45;danger" />-->
              <!--              </b-button>-->

              <!--              <RemoveButton v-tooltip="'Remove'" @click="removeItem" />-->

              <!--              <b-button-->
              <!--                v-tooltip="'Remove'"-->
              <!--                size="is-small"-->
              <!--                type="is-ghost"-->
              <!--                class="wit-paddings&#45;&#45;none"-->
              <!--                @click="removeItem"-->
              <!--              >-->
              <!--                <i class="mdi mdi-24px mdi-trash-can-outline wit-color&#45;&#45;danger" />-->
              <!--              </b-button>-->

              <!--            <b-button size="is-small" type="is-danger is-light" @click="removeItem">-->
              <!--              {{ $t('Wishlist_Remove') }}-->
              <!--            </b-button>-->
            </div>
          </div>

          <b-taglist>
            <b-tag v-if="wishlistItem.isNew" type="is-success">
              New
            </b-tag>

            <b-tag v-else type="is-primary">
              In wishlist
            </b-tag>
          </b-taglist>

          <!--          <ItemTags :item="wishlistItem.item" only-primary class="wit-offset-bottom&#45;&#45;none" />-->
        </div>
      </div>
    </div>

    <div class="wit-block--full-width wit-offset-bottom--sm">
      <PriceEditor
        v-for="price in wishlistItem.prices"
        :key="price.id"
        :price="price"
        :is-removable="hasOnePrice"
        class="wit-price-editor wit-block--full-width"
        @priceTypeChanged="onPriceTypeChanged"
        @priceRemoved="onPriceRemoved"
        @priceAdded="addPrice"
      />
    </div>

    <div class="wit-flex wit-flex--justify-end wit-block--full-width">
      <b-button
        v-if="!wishlistItem.isNew"
        size="is-small"
        type="is-danger"
        class="wit-offset-right--xs"
        @click="$emit('removeOffer', wishlistItem)"
      >
        Remove offer
      </b-button>

      <b-button
        size="is-small"
        type="is-danger is-light"
        @click="$emit('removeFromEditor', wishlistItem)"
      >
        Remove from editor
      </b-button>
    </div>

    <!--        <b-button-->
    <!--          v-if="!isAllPricesAdded"-->
    <!--          size="is-small1"-->
    <!--          type="is-primary is-light"-->
    <!--          expanded-->
    <!--          class="wit-offset-bottom&#45;&#45;sm1"-->
    <!--          style="background: transparent; border: 1px dashed var(&#45;&#45;primary); color: var(&#45;&#45;muted-text-color);"-->
    <!--          @click="addPrice"-->
    <!--        >-->
    <!--          <div class="wit-flex wit-flex&#45;&#45;center wit-color&#45;&#45;white">-->
    <!--            <i class="mdi mdi-24px mdi-plus wit-offset-right&#45;&#45;xxs" />-->
    <!--            &lt;!&ndash;        Price&ndash;&gt;-->
    <!--          </div>-->
    <!--          &lt;!&ndash;      {{ // $t('Wishlist_AddPrice') }}&ndash;&gt;-->
    <!--        </b-button>-->
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

        // isInWishlist: {
        //     type: Boolean,
        //     required: true
        // }
    },

    computed: {
        isAllPricesAdded () {
            return this.wishlistItem.prices.length >= config.MAX_PRICES
        },

        hasOnePrice () {
            return this.wishlistItem.prices.length > 1
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
            console.log(this.wishlistItem)
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
