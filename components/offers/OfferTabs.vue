<template>
  <Tabs :modes="offerTabs" :selected-mode="selectedTab" class="wit-flex--justify-center" @switch="onTabSwitch">
    <template #tab0>
      <span>{{ $t('Market') }}</span>
      <b-tag rounded class="wit-offset-left--xs wit-font-weight--600">
        {{ marketSize }}
      </b-tag>
    </template>

    <template #tab1>
      <span>{{ $t('Wishlist') }}</span>
      <b-tag rounded class="wit-offset-left--xs wit-font-weight--600">
        {{ wishlistSize }}
      </b-tag>
    </template>
  </Tabs>
</template>

<script>
import { computed, useRouter, useStore } from '@nuxtjs/composition-api'
import Tabs from '@/components/basic/Tabs.vue'
import { OfferTabModes } from '@/domain'
import { buildUserMarketUrl, buildUserWishlistUrl } from '~/utils/index.js'

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

        const profile = computed(() => store.getters['offers/profile'])
        const marketSize = computed(() => store.getters['offers/marketSize'])
        const wishlistSize = computed(() => store.getters['offers/wishlistSize'])

        const onTabSwitch = (selectedTab) => {
            const profileId = profile.value.id
            const isMarketTab = selectedTab === OfferTabModes.MARKET

            router.push(isMarketTab ? buildUserMarketUrl(profileId) : buildUserWishlistUrl(profileId))
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
