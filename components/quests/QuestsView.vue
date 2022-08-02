<template>
  <div>
    <Loader v-if="isQuestsLoading" />
    <QuestsGrid v-else-if="hasAnyQuest" class="wis-quests-grid" :quests="quests" />
    <EmptyState v-else :text="$t('Quests_NoQuests')" icon="microsoft-xbox-controller-battery-empty" />
  </div>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import { EmptyState, Loader } from '@/components/basic'
import { QuestsGrid } from '@/components/quests'

export default {
    name: 'QuestsView',

    components: {
        QuestsGrid,
        Loader,
        EmptyState
    },

    setup () {
        const store = useStore()

        const isQuestsLoading = computed(() => store.state.quest.isLoading)
        const quests = computed(() => store.state.quest.quests)
        const hasAnyQuest = computed(() => quests.value.length > 0)

        return { isQuestsLoading, quests, hasAnyQuest }
    }
}
</script>
