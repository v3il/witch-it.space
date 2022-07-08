<template>
  <div class="wit-flex wit-flex--column">
    <Header />
    <UserView class="wit-offset-bottom--md" />
    <Navigation :links="userLinks" :title="$t('UserDashboardsTitle')" class="wit-offset-bottom--md" />
    <Navigation :links="appLinks" :title="$t('AppPagesTitle')" class="wit-offset-bottom--md" />

    <!--    <div class="wit-flex wit-flex&#45;&#45;column wit-flex&#45;&#45;justify-center wit-block&#45;&#45;full-height">-->
    <!--      <b-button-->
    <!--        v-for="link in links"-->
    <!--        :key="link.to"-->
    <!--        type="is-ghost"-->
    <!--        class="is-large wit-transition wit-link"-->
    <!--        :to="link.to"-->
    <!--        tag="nuxt-link"-->
    <!--      >-->
    <!--        <div class="wit-link__icon-container wit-position&#45;&#45;relative" :class="getLinkClass(link)">-->
    <!--          <b-icon class="is-size-5 wit-color&#45;&#45;Y400" :icon="link.icon" />-->
    <!--        </div>-->
    <!--      </b-button>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { computed, useStore } from '@nuxtjs/composition-api'
import { User } from '@/store/index.js'
import Header from '@/components/sidebar/Header.vue'
import UserView from '@/components/sidebar/UserView.vue'
import Navigation from '@/components/sidebar/components/Navigation.vue'
import {
    buildUserManageMarketUrl,
    buildUserManageWishlistUrl,
    buildUserMarketUrl,
    buildUserWishlistUrl
} from '@/utils/index.js'
import { Routes } from '@/shared/index.js'

export default {
    name: 'LeftNavBar',

    components: {
        Header,
        UserView,
        Navigation
    },

    setup () {
        const store = useStore()
        const userId = computed(() => store.state.user.user.id)

        const userLinks = computed(() => [
            { icon: 'store-outline', label: 'MainMenu_MyMarket', to: buildUserMarketUrl(userId.value) },
            { icon: 'store-cog-outline', label: 'MainMenu_ManageMarket', to: buildUserManageMarketUrl(userId.value) },
            { icon: 'heart-outline', label: 'MainMenu_MyWishlist', to: buildUserWishlistUrl(userId.value) },
            { icon: 'heart-cog-outline', label: 'MainMenu_ManageWishlist', to: buildUserManageWishlistUrl(userId.value) }
        ])

        const appLinks = computed(() => [
            { icon: 'account-group-outline', label: 'MainMenu_Profiles', to: Routes.PROFILES },
            { icon: 'view-grid-outline', label: 'MainMenu_Items', to: Routes.ITEMS },
            { icon: 'file-tree', label: 'MainMenu_Quests', to: Routes.QUESTS },
            { icon: 'cog', label: 'MainMenu_Settings', to: Routes.SETTINGS }
        ])

        return { userLinks, appLinks }
    },

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        ...mapGetters(User.PATH, [
            User.Getters.IS_VERIFIED
        ])
    },

    methods: {
        getLinkClass (link) {
            return {
                'wit-indicator wit-indicator--6px': !this.isVerified && link.withIndicator
            }
        }
    }
}
</script>

<style scoped lang="scss">

.wit-link {
    border-radius: 0;

    &:hover,
    &.nuxt-link-exact-active {
        background-color: rgba(239, 242, 247, 0.05);
    }
}

.wit-link__icon-container {
    height: 1.5em;
    width: 1.5em;
}
</style>
