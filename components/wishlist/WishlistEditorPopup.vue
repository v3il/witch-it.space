<template>
  <Popup ref="wishlistEditor" popup-title="Wishlist editor" :popup-size="$options.popupSize" @submit="setGlobalPrices">
    <div v-if="selectedItems.length" class="wit-flex__item--grow wit-flex wit-flex--column wit-block--full-height aaa">
      <ScrollablePagination :items="selectedItems" :items-per-page="20">
        <template #default="{ visibleItems }">
          <Grid cell-width="300px" mobile-cell-width="300px">
            <WishlistSelectedItem
              v-for="wishlistModel in visibleItems"
              :key="wishlistModel.id"
              :wishlist-item="wishlistModel"
              class="wit-wishlist-editor__item"
              @itemRemoved="toggleWishlistItem"
              @delete="onDelete"
            />
          </Grid>
        </template>
      </ScrollablePagination>

      <div class="wit-flex__item--no-shrink wit-flex wit-paddings--sm">
        <b-button type="is-primary" class="wit-flex__item--grow1 wit-offset-right--xs" expanded @click="saveWishlistItems">
          Save
        </b-button>

        <b-button type="is-primary is-light" class="wit-offset-right--xs" expanded @click="clearEditor">
          Clear editor
        </b-button>

        <v-popover ref="popover" placement="top-end">
          <b-button type="is-link" class="wit-position--relative wit-more-actions">
            <i class="mdi mdi-24px mdi-dots-grid" />
          </b-button>

          <div slot="popover">
            <ul>
              <li>
                <b-button type="is-ghost" class="wit-color--white" @click="setPriceForAllItems">
                  Set price for all items
                </b-button>
              </li>
              <!--                      <li>-->
              <!--                        <b-button type="is-ghost" class="wit-color&#45;&#45;white" @click="removeFromWishlist">-->
              <!--                          Remove filtered items from wishlist-->
              <!--                        </b-button>-->
              <!--                      </li>-->
            </ul>
          </div>
        </v-popover>
      </div>
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
        selectedItems: {
            required: true,
            type: Array
        }
    },

    methods: {
        show () {
            this.$refs.wishlistEditor.show()
        }
    }
}
</script>

<style scoped>

</style>
