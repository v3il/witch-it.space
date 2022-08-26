<template>
  <div v-if="quests.length" class="wis-quests-grid">
    <QuestView v-for="quest in quests" :key="quest.id" :quest="quest" />
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
    }
}
</script>

<style scoped lang="scss">
.wis-quests-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
}
</style>
