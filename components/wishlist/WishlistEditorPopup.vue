<template>
  <Popup ref="wishlistEditor" popup-title="Wishlist editor" :popup-size="$options.popupSize">
    <div v-if="offers.length" class="wit-flex wit-flex--column wit-overflow--hidden">
      <ScrollablePagination :items="offers" :items-per-page="20">
        <template #default="{ visibleItems }">
          <Grid cell-width="300px" mobile-cell-width="100%" class="wit-offset-right--xs">
            <WishlistSelectedItem
              v-for="wishlistModel in visibleItems"
              :key="wishlistModel.id"
              :wishlist-item="wishlistModel"
              class="wit-wishlist-editor__item wit-paddings--sm"
              @itemRemoved="removeFromEditor"
              @delete="deleteOffer"
            />
          </Grid>
        </template>
      </ScrollablePagination>

      <!--      <div class="wit-flex__item&#45;&#45;no-shrink wit-flex wit-paddings&#45;&#45;sm">-->
      <!--        <b-button type="is-primary" class="wit-flex__item&#45;&#45;grow1 wit-offset-right&#45;&#45;xs" expanded @click="saveWishlistItems">-->
      <!--          Save-->
      <!--        </b-button>-->

      <!--        <b-button type="is-primary is-light" class="wit-offset-right&#45;&#45;xs" expanded @click="clearEditor">-->
      <!--          Clear editor-->
      <!--        </b-button>-->

      <!--        <v-popover ref="popover" placement="top-end">-->
      <!--          <b-button type="is-link" class="wit-position&#45;&#45;relative wit-more-actions">-->
      <!--            <i class="mdi mdi-24px mdi-dots-grid" />-->
      <!--          </b-button>-->

      <!--          <div slot="popover">-->
      <!--            <ul>-->
      <!--              <li>-->
      <!--                <b-button type="is-ghost" class="wit-color&#45;&#45;white" @click="setPriceForAllItems">-->
      <!--                  Set price for all items-->
      <!--                </b-button>-->
      <!--              </li>-->
      <!--              &lt;!&ndash;                      <li>&ndash;&gt;-->
      <!--              &lt;!&ndash;                        <b-button type="is-ghost" class="wit-color&#45;&#45;white" @click="removeFromWishlist">&ndash;&gt;-->
      <!--              &lt;!&ndash;                          Remove filtered items from wishlist&ndash;&gt;-->
      <!--              &lt;!&ndash;                        </b-button>&ndash;&gt;-->
      <!--              &lt;!&ndash;                      </li>&ndash;&gt;-->
      <!--            </ul>-->
      <!--          </div>-->
      <!--        </v-popover>-->
      <!--      </div>-->
    </div>

    <div v-else class="wit-flex wit-flex--center wit-block--full-height wit-paddings--xs">
      <EmptyState icon="cursor-default-click-outline" :text="$t('Wishlist_SelectItemToEdit')" class="wit-padding-top--sm" />
    </div>
  </Popup>
</template>

<script>
import Popup from '@/components/basic/popup/Popup.vue'
import EmptyState from '@/components/basic/EmptyState.vue'
import ScrollablePagination from '@/components/basic/ScrollablePagination.vue'
import WishlistSelectedItem from '@/components/wishlist/WishlistSelectedItem.vue'
import { PopupSizes } from '@/components/basic/popup/PopupSizes.js'
import Grid from '@/components/basic/Grid.vue'

export default {
    name: 'WishlistEditorPopup',

    popupSize: PopupSizes.LG,

    components: {
        Popup,
        EmptyState,
        ScrollablePagination,
        WishlistSelectedItem,
        Grid
    },

    props: {
        offers: {
            required: true,
            type: Array
        }
    },

    methods: {
        show () {
            this.$refs.wishlistEditor.show()
        },

        removeFromEditor (offerToRemove) {
            const remainingOffers = this.offers.filter(offer => offer !== offerToRemove)
            this.$emit('updateOfferList', remainingOffers)
        },

        deleteOffer () {

        }
    }
}
</script>

<style scoped lang="scss">
.wit-wishlist-editor__item {
    border: var(--default-border);
    border-radius: var(--offset-xxs);
}
</style>
