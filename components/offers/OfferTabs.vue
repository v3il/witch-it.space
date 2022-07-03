<template>
  <Tabs :modes="offerTabs" :selected-mode="selectedTab" @switch="onTabSwitch">
    <template #tab0>
      <span class="wis-tabs__label">{{ $t('Market') }}</span>
      <b-tag rounded class="wit-offset-left--xs wit-font-weight--600">
        {{ marketSize }}
      </b-tag>
    </template>

    <template #tab1>
      <span class="wis-tabs__label">{{ $t('Wishlist') }}</span>
      <b-tag rounded class="wit-offset-left--xs wit-font-weight--600">
        {{ wishlistSize }}
      </b-tag>
    </template>
  </Tabs>
</template>

<script>
import { useContext, useRouter, computed, useStore } from '@nuxtjs/composition-api'
import Tabs from '@/components/basic/Tabs.vue'
import { OfferTabModes } from '@/domain'
import { buildUserMarketUrl, buildUserWishlistUrl } from '~/utils/index.js'
import { StoreModules } from '~/store/index.js'

export default {
    name: 'OfferTabs',

    components: {
        Tabs
    },

    props: {
        selectedTab: {
            required: true,
            type: String
        }
    },

    setup () {
        const router = useRouter()
        const store = useStore()
        const offerTabs = OfferTabModes.values

        const marketSize = computed(() => store.getters['offers/marketSize'])
        const wishlistSize = computed(() => store.getters['offers/wishlistSize'])

        // const { isMyWishlistMode } = useNamespacedGetters(StoreModules.OFFERS, ['isMyWishlistMode'])

        console.error(store.getters['offers/marketSize'])
        console.error(store.getters['offers/wishlistSize'])

        const onTabSwitch = (selectedTab) => {
            router.push(selectedTab === OfferTabModes.MARKET ? buildUserMarketUrl(22) : buildUserWishlistUrl(22))
        }

        return {
            offerTabs,
            marketSize,
            wishlistSize,
            onTabSwitch
        }
    }
}
</script>
