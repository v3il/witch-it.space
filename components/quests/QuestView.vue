<template>
  <div class="wis-quest-view">
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
    }
}
</script>

<style scoped lang="scss">
.wis-quest-view {
    background-color: var(--card-bg-color);
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    height: 22rem;
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
    margin-bottom: 24px;
}
</style>
