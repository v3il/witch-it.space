<template>
  <div>
    <!--    <TopNavBar class="layout__header">-->
    <!--      <template #brand>-->
    <!--        <nuxt-link to="/profiles">-->
    <!--          Profiles-->
    <!--        </nuxt-link>-->
    <!--      </template>-->

    <!--      <template #topMenu>-->
    <!--        <TopTabs :modes="$options.modes" :selected-mode="mode" @switch="redirectToOrders">-->
    <!--          <template #tab0>-->
    <!--            {{ $t('Wishlist_TopTabs_Orders') }}-->
    <!--          </template>-->

    <!--          <template #tab1>-->
    <!--            {{ $t('Wishlist_TopTabs_Wishlist') }}-->
    <!--            <span class="wit-top-tabs__counter wit-offset-left&#45;&#45;xxs">{{ wishlist.length }}</span>-->
    <!--          </template>-->
    <!--        </TopTabs>-->
    <!--      </template>-->
    <!--    </TopNavBar>-->

    <div class="wit-items wit-flex">
      wishlist

      <!--      <div style="flex-basis: 350px;" class="wit-offset-right&#45;&#45;md">-->
      <!--        <UserView v-if="profile" :profile="profile">-->
      <!--          <template #note>-->
      <!--            <h5 class="wit-font-weight&#45;&#45;700 wit-font-size&#45;&#45;sm wit-offset-bottom&#45;&#45;xs">-->
      <!--              {{ $t('UserView_NoteTitle') }}111-->
      <!--            </h5>-->

      <!--            <p class="wit-line-height&#45;&#45;md wit-color&#45;&#45;muted">-->
      <!--              {{ profile.wishlistNote }}-->
      <!--            </p>-->
      <!--          </template>-->
      <!--        </UserView>-->
      <!--      </div>-->

      <div class="wit-flex__item--grow">
        <!--        <div class="wit-flex wit-offset-bottom&#45;&#45;md wit-flex&#45;&#45;justify-center">-->
        <!--          <div style="flex-basis: 500px; padding-left: 16px; padding-right: 16px;" class="wit-padding-le">-->
        <!--            <div class="wit-offset-bottom&#45;&#45;xs">-->
        <!--              <b-button type="is-success" class="wit-transition wit-offset-right&#45;&#45;xxs" @click="() => {}">-->
        <!--                Add items-->
        <!--              </b-button>-->

        <!--              <b-button type="is-success" class="wit-transition wit-offset-right&#45;&#45;xxs" @click="() => {}">-->
        <!--                Manage-->
        <!--              </b-button>-->
        <!--            </div>-->

        <!--            <b-button type="is-success" class="wit-transition wit-offset-right&#45;&#45;xxs" @click="areFiltersVisible = !areFiltersVisible">-->
        <!--              Filters-->
        <!--            </b-button>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <ItemFilters v-if="areFiltersVisible" :filters-data="filters" class="wit-flex__item&#45;&#45;grow wit-offset-bottom&#45;&#45;md" @change="() => {}" @reset="() => {}" />-->

        <Card v-if="isMyProfile" class="wit-offset-bottom--md">
          <div class="wit-flex wit-flex--justify-end wit-flex--wrap">
            <b-button type="is-primary" class="wit-transition wit-offset-right--xs">
              Create offer
            </b-button>

            <b-button type="is-primary" class="wit-transition wit-offset-right--xs">
              Wishlist item
            </b-button>

            <b-dropdown
              animation="fade150"
              class="wit-block--full-height wit-transition--background wit-dropdown--offset-xs"
              style="background-color: rgb(46, 54, 72); border: 1px solid rgb(54, 57, 76); border-radius: 4px; cursor: pointer; height: 35px; width: 35px;"
              position="is-bottom-left"
              @active-change="() => {}"
            >
              <template #trigger>
                <div class="wit-flex wit-flex--center wit-block--full-height" style="width: 32px;">
                  <i class="mdi mdi-dots-grid mdi-24px" style="color: #dbdbdb;" />
                </div>
              </template>

              <div style="width: 600px; height: 600px;">
                Filters
              </div>
            </b-dropdown>

            <!--            <b-button type="is-primary is-light" class="wit-transition" @click="selectedItem = null">-->
            <!--              <i class="mdi mdi-dots-grid mdi-24px" />-->
            <!--            </b-button>-->
          </div>
        </Card>

        <Card>
          <WishlistFilter :filters-data="filters" class="wit-offset-bottom--sm" @change="() => {}" />

          <div class="wit-flex wit-flex--wrap wit-items__item-grid">
            <WishlistItemView
              v-for="item in wishlist"
              :key="item.id"
              :wishlist-item="item"
              @clicked.stop
            />
          </div>
        </Card>
      </div>

      <div v-if="selectedItem" class="wit-items__sidebar">
        <div class="wit-offset-bottom--sm wit-flex">
          <ItemView :item="selectedItem" :is-title-shown="false" class="wit-offset-right--sm wit-flex__item--no-shrink wit-items__selected-item-view" />

          <div>
            <h4 class="wit-offset-bottom--sm wit-font-size--sm">
              {{ selectedItem.name }}
            </h4>

            <ItemTags :item="selectedItem" />
          </div>
        </div>

        <p class="wit-offset-bottom--sm">
          In stock: 10
        </p>

        <b-button type="is-primary" class="wit-transition">
          Create offer
        </b-button>

        <b-button type="is-primary" class="wit-transition">
          Wishlist item
        </b-button>

        <b-button type="is-primary is-light" class="wit-transition" @click="selectedItem = null">
          Close
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserView from '@/components/UserView'
import ItemView from '@/components/items/ItemView'
import ItemFilters from '@/components/items/ItemFilters'
import { buildUserMarketUrl } from '@/utils'
import ItemTags from '@/components/items/ItemTags'
import WishlistItemView from '@/components/wishlist/WishlistItemView'
import Card from '@/components/Card'
import TopNavBar from '@/components/TopNavBar'
import WishlistFilter from '@/components/wishlist/WishlistFilter'
import { User } from '@/store'

const Modes = {
    MARKET: 'market',
    WISHLIST: 'wishlist'
}

const DEFAULT_FILTERS = {
    query: '',
    rarities: [],
    isOnlyTradeable: false,
    isOnlyOwned: false,
    slots: [],
    events: []
}

export default {
    modes: Object.values(Modes),

    components: {
        ItemView,
        WishlistItemView,
        ItemTags,
        WishlistFilter,
        // UserView,
        Card
        // TopNavBar
    },

    middleware: ['fetchUser'],

    data: () => ({
        wishlist: [],
        profile: null,
        page: 1,
        selectedItem: null,
        filters: { ...DEFAULT_FILTERS },
        areFiltersVisible: false,
        mode: Modes.WISHLIST
    })

    // computed: {
    //     ...mapState(User.PATH, [
    //         User.State.USER
    //     ]),
    //
    //     isMyProfile () {
    //         return this.user.id === this.profile?.id
    //     }
    // },
    //
    // async created () {
    //     await this.$itemsService.fetch()
    //     const { error, wishlist, user } = await this.$wishlistService.fetch(this.$route.params.id)
    //
    //     if (error) {
    //         return this.$showError(error)
    //     }
    //
    //     this.wishlist = wishlist
    //     this.profile = user
    // },
    //
    // methods: {
    //     redirectToOrders () {
    //         this.$router.push(buildUserMarketUrl(this.profile.id))
    //     }
    // }
}
</script>

<style scoped lang="scss">
.wit-items {
    padding: var(--offset-md);

    @media screen and (max-width: 1024px) {
        padding-left: 0;
        padding-right: 0;
    }
}

.wit-items__item-grid {
    //display: grid;
    //grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-column-gap: 16px;
    //justify-items: center;
    grid-row-gap: 16px;

    //@media screen and (max-width: 768px) {
    //    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    //}

    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
}

.wit-items__sidebar {
    flex-basis: 450px;
    padding: 0 24px;
    position: sticky;
    top: 94px;
    max-height: calc(100vh - 94px);
}

.wit-items__selected-item-view {
    width: 100%;
    max-width: 100px;
}

.wit-item-image__image {
    border-radius: 8px;
    display: block;
}
</style>
