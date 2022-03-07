<template>
  <div class="wit-flex wit-flex--column wit-flex--align-start wit-block--full-width">
    <div class="wit-flex wit-flex--align-start wit-block--full-width wit-offset-bottom--sm">
      <ItemView add-tooltip :item="wishlistItem.item" :is-title-shown="false" style="max-width: 58px;" class="wit-overflow--hidden wit-offset-right--sm wit-flex__item--no-shrink">
        <div v-if="wishlistItem.isNew" class="new-label">
          NEW
        </div>
      </ItemView>

      <div class="wit-flex__item--grow" style="flex: 1 1 auto; min-width: 0;">
        <div class="wit-flex wit-flex--column wit-block--full-width wit-offset-bottom--xs1">
          <div class="wit-flex wit-flex--align-center wit-offset-bottom--xs">
            <p class="wit-font-size--sm1 wit-offset-right--xs1 wit-flex__item--grow wit-text--overflow" style="font-size: 16px;">
              {{ wishlistItem.item.name }}
            </p>

            <!--            <p>{{ wishlistItem.isNew }}</p>&nbsp;-->
            <!--            <p>{{ JSON.stringify(wishlistItem.id) }}</p>&nbsp;-->
            <!--            <p>{{ wishlistItem.hasChanges }}</p>-->

            <!--            <div class="wit-flex wit-flex&#45;&#45;align-center wit-offset-left&#45;&#45;xs wit-flex__item&#45;&#45;no-shrink">-->
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
            <!--            </div>-->
          </div>

          <div class="wit-flex wit-flex--justify-end1 wit-block--full-width">
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
              type="is-danger is-light1"
              @click="$emit('removeFromEditor', wishlistItem)"
            >
              Remove
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <div class="wit-block--full-width wit-offset-bottom--sm1">
      <PriceEditor
        v-for="price in wishlistItem.changedPrices"
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
            return this.wishlistItem.changedPrices.length >= config.MAX_PRICES
        },

        hasOnePrice () {
            return this.wishlistItem.changedPrices.length > 1
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
