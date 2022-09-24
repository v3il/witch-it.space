<template>
  <div class="wis-quest-view" :style="questStyles">
    <div class="wis-quest-view__section">
      <QuestHeader :quest="quest" class="wit-offset-bottom--sm" />

      <h3 class="wit-offset-bottom--sm wis-quest-view__name">
        {{ $t(`Quests_${quest.questTask}`) }}
      </h3>

      <QuestReward :quest="quest" />
    </div>

    <div class="wis-quest-view__progress wit-offset-top--auto">
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
    QuestReward
} from './questView/index.js'

export default {
    name: 'QuestView',

    components: {
        QuestHeader,
        QuestReward,
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

    setup (props) {
        const isDailyQuest = computed(() => props.quest.questType === 'Daily')
        const questStyles = computed(() => ({
            '--quest-color': isDailyQuest.value ? 'var(--light-blue)' : 'var(--dark-pink)'
        }))

        return { questStyles }
    }
}
</script>

<style scoped lang="scss">
.wis-quest-view {
    background-color: var(--card-bg-color);
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    height: 20rem;
    flex-basis: 320px;
    border: 1px solid #64748b;
}

.wis-quest-view__name {
    font-weight: 500;
    font-size: 1rem;
    line-height: 24px;
}

.wis-quest-view__section {
    padding: 24px;
}

.wis-quest-view__progress {
    padding: 0 24px;
    margin-bottom: 16px;
}
</style>
