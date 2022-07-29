<template>
  <div class="wis-quests-grid">
    <QuestView v-for="quest in quests" :key="quest.id" can-replace :quest="quest" class="wis-quests-grid__quest" />
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
        },

        isLoading: {
            required: true,
            type: Boolean
        },

        canReplaceQuests: {
            required: true,
            type: Boolean
        }
    },

    methods: {
        replaceQuest (quest) {
            this.$emit('replace', quest)
        },

        finalizeQuest (quest) {
            this.$emit('finalize', quest)
        }
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
