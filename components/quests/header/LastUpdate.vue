<template>
  <Description icon-name="update">
    {{ $t('Wishlist_LastUpdate') }}: {{ formattedLastUpdate }}
  </Description>
</template>

<script>
import { ref, useContext, useStore, watch } from '@nuxtjs/composition-api'
import { humanizeTimestampDiff } from '@/utils'
import { Description } from '@/components/basic/header'

export default {
    name: 'LastUpdate',

    components: {
        Description
    },

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
