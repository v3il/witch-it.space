<template>
  <div class="wis-quests-grid">
    <QuestView
      v-for="quest in quests"
      :key="quest.id"
      :quest="quest"
      class="wis-quests-grid__quest"
      @replace="replaceQuest"
      @finalize="finalizeQuest"
    />
  </div>
</template>

<script>
import QuestView from '@/components/quests/QuestView.vue'

export default {
    name: 'QuestsGrid',

    components: {
        QuestView
    },

    props: {
        quests: {
            required: true,
            type: Array
        }
    },

    setup (_, { emit }) {
        const replaceQuest = quest => emit('replace', quest)
        const finalizeQuest = quest => emit('finalize', quest)

        return { replaceQuest, finalizeQuest }
    }
}
</script>

<style scoped lang="scss">
.wis-quests-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    @media (max-width: 769px) {
        justify-content: center;
    }
}

.wis-quests-grid__quest {
    flex-basis: 320px;
}
</style>
