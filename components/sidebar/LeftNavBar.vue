<template>
  <div class="wit-flex wit-flex--column">
    <Header />

    <Navigation v-if="user" :links="userLinks" :title="$t('UserDashboardsTitle')" class="wit-offset-bottom--md" />
    <Navigation v-else :links="authLinks" :title="$t('AuthorizationTitle')" class="wit-offset-bottom--md" />

    <Navigation :links="appLinks" :title="$t('AppPagesTitle')" class="wit-offset-bottom--md" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { computed, useStore } from '@nuxtjs/composition-api'
import { User } from '@/store/index.js'
import Header from '@/components/sidebar/Header.vue'
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
        Navigation
    },

    setup () {
        const store = useStore()
        const user = computed(() => store.state.user.user)
        const isAuthorized = computed(() => !!user.value)
        const userId = computed(() => user.value.id)
        const marketSize = computed(() => user.value.marketSize)
        const wishlistSize = computed(() => user.value.wishlistSize)

        const authLinks = computed(() => [
            { icon: 'store-outline', label: 'MainMenu_Login', to: Routes.LOGIN },
            { icon: 'store-outline', label: 'MainMenu_Register', to: Routes.REGISTER }
        ])

        const userLinks = computed(() => [
            { icon: 'store-outline', label: 'MainMenu_MyMarket', to: buildUserMarketUrl(userId.value), badge: marketSize.value },
            { icon: 'store-cog-outline', label: 'MainMenu_ManageMarket', to: buildUserManageMarketUrl(userId.value) },
            { icon: 'heart-outline', label: 'MainMenu_MyWishlist', to: buildUserWishlistUrl(userId.value), badge: wishlistSize.value },
            { icon: 'heart-cog-outline', label: 'MainMenu_ManageWishlist', to: buildUserManageWishlistUrl(userId.value) }
        ])

        const appLinks = computed(() => [
            { icon: 'account-group-outline', label: 'MainMenu_Profiles', to: Routes.PROFILES },
            { icon: 'view-grid-outline', label: 'MainMenu_Items', to: Routes.ITEMS }
        ])

        if (isAuthorized.value) {
            appLinks.push(
                { icon: 'file-tree-outline', label: 'MainMenu_Quests', to: Routes.QUESTS },
                { icon: 'cog-outline', label: 'MainMenu_Settings', to: Routes.SETTINGS }
            )
        }

        return { userLinks, appLinks, authLinks, isAuthorized }
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
