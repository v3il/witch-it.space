<template>
  <div class="wit-flex wit-flex--column">
    <Header />

    <Navigation v-if="isAuthorized" :links="userLinks" :title="$t('UserDashboardsTitle')" class="wit-offset-bottom--md" />
    <Navigation v-else :links="authLinks" :title="$t('AuthorizationTitle')" class="wit-offset-bottom--md" />

    <Navigation :links="appLinks" :title="$t('AppPagesTitle')" class="wit-offset-bottom--md" />
  </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
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
        const isAuthorized = computed(() => store.getters['user/isAuthorized'])
        const userId = computed(() => user.value.id)
        const marketSize = computed(() => user.value.marketSize)
        const wishlistSize = computed(() => user.value.wishlistSize)

        const authLinks = computed(() => [
            { icon: 'login-variant', label: 'MainMenu_Login', to: Routes.LOGIN },
            { icon: 'account-plus-outline', label: 'MainMenu_Register', to: Routes.REGISTER }
        ])

        const userLinks = computed(() => [
            { icon: 'store-outline', label: 'MainMenu_MyMarket', to: buildUserMarketUrl(userId.value), badge: marketSize.value },
            { icon: 'store-cog-outline', label: 'MainMenu_ManageMarket', to: buildUserManageMarketUrl(userId.value) },
            { icon: 'heart-outline', label: 'MainMenu_MyWishlist', to: buildUserWishlistUrl(userId.value), badge: wishlistSize.value },
            { icon: 'heart-cog-outline', label: 'MainMenu_ManageWishlist', to: buildUserManageWishlistUrl(userId.value) }
        ])

        const appLinks = computed(() => {
            const links = [
                { icon: 'account-group-outline', label: 'MainMenu_Profiles', to: Routes.PROFILES },
                { icon: 'view-grid-outline', label: 'MainMenu_Items', to: Routes.ITEMS }
            ]

            const authorizedLinks = [
                { icon: 'file-tree-outline', label: 'MainMenu_Quests', to: Routes.QUESTS },
                { icon: 'cog-outline', label: 'MainMenu_Settings', to: Routes.SETTINGS }
            ]

            return isAuthorized.value ? links.concat(authorizedLinks) : links
        })

        return { userLinks, appLinks, authLinks, isAuthorized }
    }
}
</script>
