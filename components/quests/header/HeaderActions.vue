<template>
  <div class="wis-quest-actions">
    <b-button type="is-primary" class="wis-btn--rounded" :disabled="isQuestsLoading || !isUpdateAvailable" @click="updateQuests">
      <i class="mdi mdi-18px wit-offset-right--xs mdi-refresh" />
      {{ $t('Quests_UpdateQuests') }}
    </b-button>

    <b-tag v-if="!isUpdateAvailable" type="is-warning" class="wit-quest-actions__counter wit-font-weight--700">
      {{ timeToNextUpdate }}
    </b-tag>
  </div>
</template>

<script>
import { computed, ref, useContext, useStore, watch } from '@nuxtjs/composition-api'
import { config, getCurrentTimestamp } from '@/shared/index.js'
import { formatNumber } from '@/utils/index.js'

export default {
    name: 'HeaderActions',

    setup () {
        const store = useStore()
        const { $showError, $showSuccess, $t } = useContext()

        let lastUpdateIntervalId = 0
        const isUpdateAvailable = ref(true)
        const timeToNextUpdate = ref('')

        const isMySteamProfile = computed(() => store.getters['user/isMySteamProfile'])
        const isQuestsLoading = computed(() => store.state.quest.isLoading)

        watch(() => store.state.quest.questsUpdateTimestamp, (value) => {
            clearInterval(lastUpdateIntervalId)

            const handler = () => {
                const nextUpdate = value + config.QUESTS_UPDATE_TIMEOUT
                const diff = nextUpdate - getCurrentTimestamp()

                isUpdateAvailable.value = isMySteamProfile.value ? true : diff <= 0

                if (isUpdateAvailable.value) {
                    return clearInterval(lastUpdateIntervalId)
                }

                const seconds = diff % 60
                const minutes = Math.floor((diff - seconds) / 60)

                timeToNextUpdate.value = `${formatNumber(minutes)}:${formatNumber(seconds)}`
            }

            handler()
            lastUpdateIntervalId = setInterval(handler, 1000)
        }, { immediate: true })

        const updateQuests = () => {
            const canUpdate = !(isQuestsLoading.value || !isUpdateAvailable.value)

            if (canUpdate) {
                store.dispatch('quest/updateUserQuests')
                    .then(() => $showSuccess($t('Quests_Updated')))
                    .catch($showError)
            }
        }

        return { isUpdateAvailable, timeToNextUpdate, isQuestsLoading, updateQuests }
    }
}
</script>

<style scoped lang="scss">
.wis-quest-actions {
    position: relative;
    margin: var(--offset-sm) 0 var(--offset-sm) var(--offset-sm);

    @media (max-width: 600px) {
        margin-bottom: 0;
        margin-left: 0;
    }
}

.wit-quest-actions__counter {
    position: absolute;
    right: 0;
    top: -12px;
    width: 60px;
}
</style>
