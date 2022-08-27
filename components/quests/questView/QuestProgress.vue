<template>
  <div class="wit-flex wit-flex--align-center">
    <span class="wit-color--muted wit-offset-right--xs">
      {{ $t('Progress') }}:
    </span>

    <span class="wis-progress__tag">
      {{ progress }} / {{ objective }}
    </span>
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

<style scoped lang="scss">
.wis-progress__tag {
    color: var(--quest-color);
}
</style>
