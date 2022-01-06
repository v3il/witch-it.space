<template>
  <div>
    <TopNavBar class="layout__header">
      <template #topMenu>
        <TopTabs :modes="$options.modes" :selected-mode="mode" @switch="onModeChange">
          <template #tab0>
            {{ $t('Wishlist_TopTabs_Orders') }}
            <span class="wit-top-tabs__counter wit-offset-left--xxs">{{ marketSize }}</span>
          </template>

          <template #tab1>
            {{ $t('Wishlist_TopTabs_Wishlist') }}
            <span class="wit-top-tabs__counter wit-offset-left--xxs">{{ wishlistSize }}</span>
          </template>
        </TopTabs>
      </template>
    </TopNavBar>

    <div class="wit-profile wit-flex">
      <template v-if="error">
        <EmptyState :text="$t('Profiles_ProfileNotFound')" icon="account-remove" class="wit-padding-top--sm wit-block--full-width">
          <nuxt-link to="/profiles" class="wit-padding-top--xs">
            {{ $t('Profiles_BackToProfilesList') }}
          </nuxt-link>
        </EmptyState>
      </template>

      <template v-else>
        <div class="wit-offset-right--md wit-profile__user">
          <UserView v-if="profile" :profile="profile" :mode="userViewMode" hide-stat-buttons />
        </div>

        <div class="wit-flex__item--grow">
          <nuxt-child :profile="profile" :is-my-profile="isMyProfile" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserView from '@/components/UserView'
import { buildUserMarketUrl, buildUserWishlistUrl } from '@/utils'
import TopNavBar from '@/components/TopNavBar'
import { User } from '@/store'
import EmptyState from '@/components/EmptyState.vue'

const Modes = {
    MARKET: 'market',
    WISHLIST: 'wishlist'
}

export default {
    modes: Object.values(Modes),

    components: {
        UserView,
        TopNavBar,
        EmptyState
    },

    middleware: ['fetchUser'],

    async asyncData ({ app: { $userService }, route }) {
        const { error, profile } = await $userService.fetch(route.params.id)
        return { error, profile }
    },

    data: () => ({
        mode: Modes.MARKET
    }),

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        isMyProfile () {
            return this.user.id === this.profile.id
        },

        userViewMode () {
            return this.mode === Modes.MARKET ? 'market' : 'wishlist'
        },

        marketSize () {
            return this.profile?.userStat.marketSize ?? 0
        },

        wishlistSize () {
            return this.profile?.userStat.wishlistSize ?? 0
        }
    },

    watch: {
        $route: {
            immediate: true,

            handler (route) {
                this.mode = route.fullPath.includes('wishlist') ? Modes.WISHLIST : Modes.MARKET
            }
        }
    },

    async created () {
        await this.$itemsService.fetch()
    },

    methods: {
        onModeChange (mode) {
            const route = mode === Modes.MARKET ? buildUserMarketUrl(this.profile.id) : buildUserWishlistUrl(this.profile.id)
            this.$router.push(route)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-profile {
    padding: var(--offset-md);

    @media screen and (max-width: 1024px) {
        padding: var(--offset-sm);
    }
}

.wit-profile__user {
    flex-basis: 350px;
}
</style>
