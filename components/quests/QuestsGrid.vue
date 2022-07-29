<template>
  <div class="wis-quests-grid">
    <QuestView v-for="quest in quests" :key="quest.id" can-replace :quest="quest" />
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
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}
</style>
