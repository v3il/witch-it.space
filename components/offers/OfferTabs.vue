<template>
  <Tabs :modes="['market', 'wishlist']" :selected-mode="'market'">
    <template #tab0>
      <NuxtLink :to="'/'" class="wit-flex wit-flex--align-center wis-color--inherit">
        <span class="wis-tabs__label">{{ $t('Market') }}</span>
        <b-tag rounded class="wit-offset-left--xs wit-font-weight--600">
          {{ 10 }}
        </b-tag>
      </NuxtLink>
    </template>

    <template #tab1>
      <div class="wit-flex wit-flex--align-center">
        <span class="wis-tabs__label">{{ $t('Wishlist') }}</span>
        <b-tag rounded class="wit-offset-left--xs wit-font-weight--600">
          {{ 99 }}
        </b-tag>
      </div>
    </template>
  </Tabs>
</template>

<script>
import Tabs from '@/components/basic/Tabs.vue'

export default {
    name: 'OfferTabs',

    components: {
        Tabs
    }
}
</script>
