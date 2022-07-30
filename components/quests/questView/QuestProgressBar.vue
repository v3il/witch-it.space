<template>
  <div :style="progressBarStyles" class="wis-quest-progressbar" />
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

export default {
    name: 'QuestProgressBar',

    props: {
        quest: {
            required: true,
            type: Object
        }
    },

    setup (props) {
        const progress = computed(() => Math.min(100, props.quest.progress / props.quest.objective * 100))
        const progressBarStyles = computed(() => ({ '--progress': `${progress.value}%` }))

        return { progress, progressBarStyles }
    }
}
</script>

<style scoped lang="scss">
.wis-quest-progressbar {
    height: 0.125rem;
    background-color: #e0e7ff;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        width: var(--progress);
        background-color: var(--primary);
    }
}
</style>
