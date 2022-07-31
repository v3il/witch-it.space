<template>
  <div class="wit-flex wit-flex--align-center">
    <span class="wit-color--muted wit-offset-right--xs">
      {{ $t('Progress') }}:
    </span>

    <b-tag rounded class="wis-progress__tag">
      {{ progress }} / {{ objective }}
    </b-tag>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

export default {
    name: 'QuestProgress',

    props: {
        quest: {
            required: true,
            type: Object
        }
    },

    setup (props) {
        const progress = computed(() => props.quest.progress)
        const objective = computed(() => props.quest.objective)

        return { progress, objective }
    }
}
</script>

<style scoped>
.wis-progress__tag {
    color: var(--white);
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0.125rem 0.75rem;
    border-radius: 9999px;
    background-color: rgb(59 130 246 / 1);
}
</style>
