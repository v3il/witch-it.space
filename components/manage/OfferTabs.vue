<template>
  <Tabs :modes="offerTabs" :selected-mode="selectedMode" class="wit-flex--justify-center" @switch="onTabSwitch">
    <template #tab0>
      <span>{{ $t('Offers') }}</span>
      <b-tag rounded class="wit-offset-left--xs wit-font-weight--600">
        {{ offersCount }}
      </b-tag>
    </template>

    <template #tab1>
      <span>{{ $t('Wishlist_OtherItems') }}</span>
      <b-tag rounded class="wit-offset-left--xs wit-font-weight--600">
        {{ availableItemsCount }}
      </b-tag>
    </template>
  </Tabs>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import Tabs from '@/components/basic/Tabs.vue'
import { ManagePageTabs } from '@/pages/profiles/_id/wishlist/WishlistTabs.js'

export default {
    name: 'OfferTabs',

    components: {
        Tabs
    },

    setup () {
        const store = useStore()
        const offerTabs = ManagePageTabs.values

        const selectedMode = computed(() => store.state.manage.mode)
        const offersCount = computed(() => store.getters['manage/filteredOfferModels'].length)
        const availableItemsCount = computed(() => store.getters['manage/filteredNonWishlistItems'].length)

        const onTabSwitch = (selectedMode) => {
            store.commit('manage/TOGGLE_MODE', selectedMode)
        }

        return {
            selectedMode,
            offerTabs,
            offersCount,
            availableItemsCount,
            onTabSwitch
        }
    }
}
</script>
