<template>
  <EmptyState :text="$t('Profiles_ProfileNotFound')" icon="account-remove" class="wit-padding-top--sm wit-block--full-width">
    <nuxt-link to="/profiles" class="wit-padding-top--xs">
      {{ $t('Profiles_BackToProfilesList') }}
    </nuxt-link>
  </EmptyState>
</template>

<script>
import EmptyState from '@/components/basic/EmptyState.vue'

export default {
    name: 'OffersEmptyState',

    components: {
        EmptyState
    }
}
</script>

<style scoped>

</style>
