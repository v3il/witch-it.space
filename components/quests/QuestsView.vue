<template>
  <div>
    <Loader v-if="isQuestsLoading" />

    <template v-else-if="hasAnyQuest">
      <QuestsGrid class="wit-offset-bottom--lg" :quests="weeklyQuests" />
      <QuestsGrid :quests="dailyQuests" />
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
.wit-quests__counter {
    position: absolute;
    top: -4px;
    right: -12px;
    margin: 0;
    z-index: 2;
    font-weight: bold;
}

@media (max-width: 600px) {
    .wis-quests__button-container {
        width: 100%;
    }

    .wis-quests__last-update {
        width: 100%;
        text-align: center;
        margin-right: 0 !important;
    }
}
</style>
