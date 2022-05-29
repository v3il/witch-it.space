<template>
  <Card class="wit-quests__column">
    <template #title>
      <h2 class="wit-font-size--sm wit-offset-bottom--sm">
        {{ title }}
      </h2>
    </template>

    <div v-if="isLoading" class="wit-padding-top--md wit-padding-bottom--md">
      <Loader />
    </div>

    <template v-else-if="quests.length">
      <QuestView
        v-for="quest in quests"
        :key="quest.id"
        class="wit-quest-view"
        :quest="quest"
        :can-replace="canReplaceQuests"
        @replace="replaceQuest"
        @finalize="finalizeQuest"
      />
    </template>

    <div v-else class="wit-padding-top--md wit-padding-bottom--md">
      <EmptyState :text="$t('Quests_NoQuests')" icon="microsoft-xbox-controller-battery-empty" />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/basic/Card.vue'
import QuestView from '@/components/quests/QuestView.vue'
import Loader from '@/components/basic/Loader.vue'
import EmptyState from '@/components/basic/EmptyState.vue'

export default {
    name: 'QuestsColumn',

    components: {
        Card,
        QuestView,
        Loader,
        EmptyState
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
        },

        title: {
            required: true,
            type: String
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
.wit-quest-view {
    padding: var(--offset-sm) 0;

    &:not(:last-child) {
        border-bottom: var(--default-border);
    }
}
</style>
