<template>
  <div class="wis-user-pages">
    <h3 class="wis-user-pages__title">
      {{ title }}
    </h3>

    <ul>
      <NavigationItem v-for="link in links" :key="link.to" :icon="link.icon" :label="link.label" :to="link.to" />
    </ul>
  </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import NavigationItem from '@/components/sidebar/components/NavigationItem.vue'
import {
    buildUserMarketUrl,
    buildUserWishlistUrl,
    buildUserManageMarketUrl,
    buildUserManageWishlistUrl
} from '@/utils/index.js'

export default {
    name: 'Navigation',

    components: { NavigationItem },

    props: {
        links: {
            required: true,
            type: Array
        },

        title: {
            required: true,
            type: String
        }
    }

    // setup () {
    //     const store = useStore()
    //     const userId = computed(() => store.state.user.user.id)
    //
    //     const links = computed(() => [
    //         { icon: 'shopping-outline', label: 'MainMenu_MyMarket', to: buildUserMarketUrl(userId) },
    //         { icon: 'clipboard-edit-outline', label: 'MainMenu_ManageMarket', to: buildUserManageMarketUrl(userId) },
    //         { icon: 'heart-multiple-outline', label: 'MainMenu_MyWishlist', to: buildUserWishlistUrl(userId) },
    //         { icon: 'clipboard-edit-outline', label: 'MainMenu_ManageWishlist', to: buildUserManageWishlistUrl(userId) }
    //     ])
    //
    //     return { links }
    // }
}
</script>

<style scoped lang="scss">
    .wis-user-pages {
        margin-left: 12px;
        margin-right: 12px;
    }

    .wis-user-pages__title {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgb(129, 140, 248);
        padding: 10px 16px;
    }
</style>
