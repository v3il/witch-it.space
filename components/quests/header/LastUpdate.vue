<template>
  <p class="wis-user-card__last-update wit-color--muted">
    <i class="mdi mdi-update mdi-18px wit-offset-right--xs" />
    <span class="wit-text--overflow">{{ $t('Wishlist_LastUpdate') }}: {{ formattedLastUpdate }}</span>
  </p>
</template>

<script>
import { ref, useContext, useStore, watch } from '@nuxtjs/composition-api'
import { humanizeTimestampDiff } from '@/utils'

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
