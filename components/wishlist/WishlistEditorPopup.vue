<template>
  <Popup ref="wishlistEditor" popup-title="Wishlist editor" :popup-size="$options.popupSize">
    <div v-if="offers.length" class="wit-flex wit-flex--column wit-overflow--hidden">
      <ScrollablePagination :items="offers" :items-per-page="20">
        <template #default="{ visibleItems }">
          <Grid cell-width="300px" mobile-cell-width="100%">
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
      <!--                                            <b-button type="is-ghost" class="wit-color&#45;&#45;white" @click="removeFromWishlist">-->
      <!--                                              Remove filtered items from wishlist-->
      <!--                                            </b-button>-->
      <!--              &lt;!&ndash;                      </li>&ndash;&gt;-->
      <!--            </ul>-->
      <!--          </div>-->
      <!--        </v-popover>-->
      <!--      </div>-->
    </div>

    <div v-else class="wit-flex wit-flex--center wit-block--full-height wit-paddings--xs">
      <EmptyState icon="cursor-default-click-outline" :text="$t('Wishlist_SelectItemToEdit')" class="wit-padding-top--sm" />
    </div>

    <template v-if="offers.length" #controlsLeft>
      <b-button type="is-danger is-light" class="wit-offset-right--xs" @click="clearEditor">
        {{ $t('Wishlist_ClearEditor') }}
      </b-button>

      <b-button type="is-primary is-light" @click="saveOffers">
        {{ $t('Wishlist_SetGlobalPrice') }}
      </b-button>
    </template>

    <template v-if="offers.length" #controlsRight>
      <b-button type="is-primary" class="wit-color--white" @click="saveOffers">
        {{ $t('Save') }}
      </b-button>
    </template>
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

        clearEditor () {
            this.$emit('updateOfferList', [])
        },

        deleteOffer () {

        },

        saveOffers () {

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
