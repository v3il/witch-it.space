<template>
    <div class="wit-flex wit-flex--column">
        <Header />

        <Navigation v-if="isAuthorized" :links="userLinks" :title="$t('UserDashboardsTitle')" class="wit-offset-bottom--md" />
        <Navigation v-else :links="authLinks" :title="$t('AuthorizationTitle')" class="wit-offset-bottom--md" />

        <Navigation :links="appLinks" :title="$t('AppPagesTitle')" class="wit-offset-bottom--md" />
    </div>
</template>

<script setup>
// import Header from './Header'
import { buildUserManageMarketUrl, buildUserManageWishlistUrl, buildUserMarketUrl, buildUserWishlistUrl } from '~/utils'
import { Routes } from '~/shared/Routes'
// import Navigation from '~/components/sidebar/components/Navigation'

const { $t } = useTranslate()
// const store = useStore()
const user = computed(() => ({})/* store.state.user.user */)
const isAuthorized = computed(() => false/* store.getters['user/isAuthorized'] */)
const isVerified = computed(() => false/* store.getters['user/isVerified'] */)
const userId = computed(() => user.value.id)
const marketSize = computed(() => user.value.marketSize)
const wishlistSize = computed(() => user.value.wishlistSize)
const profilesCount = computed(() => 1/* store.state.global.usersCount */)

const authLinks = computed(() => [
    { icon: 'login-variant', label: 'MainMenu_Login', to: Routes.LOGIN },
    { icon: 'account-plus-outline', label: 'MainMenu_Register', to: Routes.REGISTER }
])

const userLinks = computed(() => [
    { icon: 'store-outline', label: 'MainMenu_MyMarket', to: buildUserMarketUrl(userId.value), badge: 1 },
    { icon: 'store-cog-outline', label: 'MainMenu_ManageMarket', to: buildUserManageMarketUrl(userId.value) },
    { icon: 'heart-outline', label: 'MainMenu_MyWishlist', to: buildUserWishlistUrl(userId.value), badge: 1 },
    { icon: 'heart-cog-outline', label: 'MainMenu_ManageWishlist', to: buildUserManageWishlistUrl(userId.value) }
])

const appLinks = computed(() => {
    const links = [
        { icon: 'account-group-outline', label: 'MainMenu_Profiles', to: Routes.PROFILES, badge: profilesCount.value },
        { icon: 'view-grid-outline', label: 'MainMenu_Items', to: Routes.ITEMS, badge: 1 }
    ]

    const authorizedLinks = [
        { icon: 'file-tree-outline', label: 'MainMenu_Quests', to: Routes.QUESTS },
        { icon: 'cog-outline', label: 'MainMenu_Settings', to: Routes.SETTINGS, hasMark: !isVerified.value }
    ]

    return isAuthorized.value ? links.concat(authorizedLinks) : links
})
</script>
