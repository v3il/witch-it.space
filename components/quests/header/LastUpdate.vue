<template>
  <p class="wis-user-card__last-update wit-color--muted">
    <i class="mdi mdi-update mdi-18px wit-offset-right--xs" />
    <span class="wit-text--overflow">{{ $t('Wishlist_LastUpdate') }}: {{ formattedLastUpdate }}</span>
  </p>
</template>

<script>
import { computed, useContext, useStore } from '@nuxtjs/composition-api'
import { OfferTabModes } from '@/domain/index.js'
import { formatDate } from '@/utils/index.js'

export default {
    name: 'LastUpdate',

    setup () {
        const store = useStore()
        const { $t } = useContext()
        const formattedLastUpdate = computed(() => store.state.quest.formattedLastUpdate ?? $t('Time_Never'))

        return { formattedLastUpdate }
    }
}
</script>

<style scoped lang="scss">
.wis-user-card__last-update {
    display: flex;
    align-items: center;
    line-height: 24px;
}
</style>
