<template>
  <div class="wis-quest-view">
    <div class="wis-quest-view__section">
      <QuestHeader :quest="quest" class="wit-offset-bottom--sm" />

      <h3 class="wit-offset-bottom--sm wis-quest-view__name">
        {{ $t(`Quests_${quest.questTask}`) }}
      </h3>

      <QuestReward :quest="quest" />
      <QuestSeparator />
      <QuestProgress :quest="quest" />
    </div>

    <QuestProgressBar :quest="quest" />

    <div class="wis-quest-view__section wit-flex wit-flex--justify-end">
      <QuestActions :quest="quest" />
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import {
    QuestActions,
    QuestHeader,
    QuestProgress,
    QuestProgressBar,
    QuestReward,
    QuestSeparator
} from './questView/index.js'

export default {
    name: 'QuestView',

    components: {
        QuestHeader,
        QuestReward,
        QuestSeparator,
        QuestProgress,
        QuestProgressBar,
        QuestActions
    },

    props: {
        quest: {
            type: Object,
            required: true
        }
    },

    setup (props, { emit }) {
        const isCompleted = computed(() => props.quest.progress >= props.quest.objective)

        const replaceQuest = () => emit('replace', props.quest)
        const finalizeQuest = () => emit('finalize', props.quest)

        return { isCompleted, replaceQuest, finalizeQuest }
    }
}
</script>

<style scoped lang="scss">
.wis-quest-view {
    background-color: var(--card-bg-color);
    border-radius: 24px;
    //height: 24rem;
}

.wis-quest-view__name {
    font-weight: 500;
    font-size: 1rem;
    line-height: 24px;
}

.wis-quest-view__section {
    padding: 24px;
}
</style>
