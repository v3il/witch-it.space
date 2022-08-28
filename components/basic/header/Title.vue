<template>
  <h1 class="wis-header__title wit-text--overflow" :class="titleClasses">
    {{ title }}
  </h1>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

export default {
    name: 'Title',

    props: {
        title: {
            required: true,
            type: String
        },

        compact: {
            required: false,
            default: false,
            type: Boolean
        }
    },

    setup (props) {
        const titleClasses = computed(() => ({ compact: props.compact }))

        return { titleClasses }
    }
}
</script>

<style scoped lang="scss">
.wis-header__title {
    letter-spacing: -1px;
    font-size: 32px;
    line-height: 50px;

    &.compact {
        font-size: 20px;
        line-height: 36px;
    }

    @media (max-width: 769px) {
        letter-spacing: -0.025em;
        line-height: 1.75rem;
        font-size: 24px;
        margin-bottom: 4px;
    }
}
</style>
