<template>
  <div>
    <Loader v-if="isQuestsLoading" />

    <template v-else-if="hasAnyQuest">
      <QuestsGrid class="wis-quests-grid wit-offset-bottom--lg" :quests="weeklyQuests" />
      <QuestsGrid class="wis-quests-grid" :quests="dailyQuests" />
    </template>

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
        const weeklyQuests = computed(() => quests.value.filter(({ questType }) => questType === 'Weekly'))
        const dailyQuests = computed(() => quests.value.filter(({ questType }) => questType === 'Daily'))
        const hasAnyQuest = computed(() => quests.value.length > 0)

        return { isQuestsLoading, weeklyQuests, dailyQuests, hasAnyQuest }
    }
}
</script>
