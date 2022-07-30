<template>
  <div class="wit-flex wit-flex--align-center wit-flex--justify-between wis-quest-header">
    <b-tag rounded class="wis-quest-header__type" :class="tagClass">
      {{ questType }}
    </b-tag>

    <i v-if="isCompleted" v-tooltip="$t('Completed')" class="mdi mdi-18px mdi-check-decagram wis-quest-header__mark" />
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

export default {
    name: 'QuestHeader',

    props: {
        quest: {
            required: true,
            type: Object
        }
    },

    setup (props) {
        const isCompleted = computed(() => props.quest.progress === props.quest.objective)
        const questType = computed(() => props.quest.questType)
        const tagClass = computed(() => questType.value === 'Daily' ? 'daily' : 'weekly')

        return { isCompleted, questType, tagClass }
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

    &.weekly {
        background-color: rgb(59 130 246 / 1);
    }

    &.daily {
        background-color: rgb(34 197 94 / 1);
    }
}

.wis-quest-header__mark {
    color: rgb(34 197 94 / 1);
}
</style>
