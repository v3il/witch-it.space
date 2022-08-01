<template>
  <div>
    <Loader v-if="isQuestsLoading" />

    <template v-else-if="hasAnyQuest">
      <QuestsGrid class="wis-quests-grid" :quests="weeklyQuests" />
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
        const weeklyQuests = computed(() => store.getters['quest/weeklyQuests'])
        const dailyQuests = computed(() => store.getters['quest/dailyQuests'])
        const hasAnyQuest = computed(() => weeklyQuests.value.length || dailyQuests.value.length)

        return { isQuestsLoading, weeklyQuests, dailyQuests, hasAnyQuest }
    }
}
</script>

<style scoped lang="scss">
.wis-quests-grid:not(:last-child) {
    margin-bottom: 32px;
}
</style>
