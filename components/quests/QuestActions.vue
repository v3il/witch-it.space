<template>
  <div class="wis-quest-actions">
    <b-button type="is-primary" class="wis-btn--rounded" @click="updateQuests">
      <i class="mdi mdi-18px wit-offset-right--xs mdi-refresh" />
      {{ $t('Quests_UpdateQuests') }}
    </b-button>

    <b-tag v-if="!isUpdateAvailable" type="is-warning" class="wit-quests__counter">
      {{ timeToNextUpdate }}
    </b-tag>
  </div>
</template>

<script>
import { useContext, useStore } from '@nuxtjs/composition-api'

export default {
    name: 'QuestActions',

    setup () {
        const store = useStore()
        const { $showError } = useContext()

        const updateQuests = () => {
            return store.dispatch('quest/updateUserQuests').catch($showError)
        }

        return {
            isUpdateAvailable: true,
            timeToNextUpdate: '',
            updateQuests
        }
    }
}
</script>

<style scoped lang="scss">
.wis-quest-actions {
    margin: var(--offset-sm) 0 var(--offset-sm) var(--offset-sm);

    @media (max-width: 600px) {
        margin-bottom: 0;
        margin-left: 0;
    }
}
</style>
