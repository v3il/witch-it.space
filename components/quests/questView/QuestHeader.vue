<template>
  <div class="wit-flex wit-flex--align-center wit-flex--justify-between wis-quest-header">
    <b-tag rounded class="wis-quest-header__type">
      {{ questType }}
    </b-tag>

    <i v-if="isCompleted" v-tooltip="$t('Completed')" class="mdi mdi-18px mdi-check-decagram wis-quest-header__mark" />
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import { useQuestCompleted } from '../composables'

export default {
    name: 'QuestHeader',

    props: {
        quest: {
            required: true,
            type: Object
        }
    },

    setup (props) {
        const { isCompleted } = useQuestCompleted(props.quest)
        const questType = computed(() => props.quest.questType)

        return { isCompleted, questType }
    }
}
</script>

<style scoped lang="scss">
.wis-quest-header__type {
    color: var(--white);
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0.125rem 0.75rem;
    border-radius: 9999px;
    background-color: var(--quest-color);
}

.wis-quest-header__mark {
    color: rgb(34 197 94 / 1);
}
</style>
