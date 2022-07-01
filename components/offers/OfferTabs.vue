<template>
  <Tabs :modes="offerTabs" :selected-mode="selectedTab" @switch="onTabSwitch">
    <template #tab0>
      <!--      <NuxtLink :to="'/'" class="wit-flex wit-flex&#45;&#45;align-center wis-color&#45;&#45;inherit">-->
      <span class="wis-tabs__label">{{ $t('Market') }}</span>
      <b-tag rounded class="wit-offset-left--xs wit-font-weight--600">
        {{ 10 }}
      </b-tag>
      <!--      </NuxtLink>-->
    </template>

    <template #tab1>
      <!--      <div class="wit-flex wit-flex&#45;&#45;align-center">-->
      <span class="wis-tabs__label">{{ $t('Wishlist') }}</span>
      <b-tag rounded class="wit-offset-left--xs wit-font-weight--600">
        {{ 99 }}
      </b-tag>
      <!--      </div>-->
    </template>
  </Tabs>
</template>

<script>
import { useRouter, useRoute } from '@nuxtjs/composition-api'
import Tabs from '@/components/basic/Tabs.vue'
import { OfferTabModes } from '@/domain'

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

        const offerTabs = OfferTabModes.values

        const onTabSwitch = (selectedTab) => {
            console.error(router)
        }

        return {
            offerTabs,
            onTabSwitch
        }
    }
}
</script>
