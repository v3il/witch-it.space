<template>
  <p class="wis-user-card__last-update wit-color--muted">
    <i class="mdi mdi-update mdi-18px wit-offset-right--xs" />
    <span class="wit-text--overflow">{{ $t('Wishlist_LastUpdate') }}: {{ formattedLastUpdate }}</span>
  </p>
</template>

<script>
import { computed, ref, useContext, useStore, watch } from '@nuxtjs/composition-api'
import { OfferTabModes } from '@/domain/index.js'
import { formatDate, humanizeTimestampDiff } from '@/utils'

export default {
    name: 'LastUpdate',

    setup () {
        const store = useStore()
        const { $t } = useContext()

        let lastUpdateIntervalId = 0
        const formattedLastUpdate = ref('')

        watch(() => store.state.quest.questsUpdateTimestamp, (value) => {
            clearInterval(lastUpdateIntervalId)

            if (!value) {
                return formattedLastUpdate.value = $t('Time_Never')
            }

            const handler = () => {
                formattedLastUpdate.value = humanizeTimestampDiff(value, { $t })
            }

            handler()
            lastUpdateIntervalId = setInterval(handler, 5000)
        }, { immediate: true })

        // if (!state.questsUpdateTimestamp) {
        //     return
        // }
        //
        // clearInterval(state.lastUpdateIntervalId)
        //
        // const handler = () => {
        //     state.formattedLastUpdate = Date.fromTimestamp(state.questsUpdateTimestamp).humanizeTimeDiff()
        // }
        //
        // handler()
        // state.lastUpdateIntervalId = setInterval(handler, 1000)

        // const formattedLastUpdate = computed(() => store.state.quest.formattedLastUpdate ?? $t('Time_Never'))

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
