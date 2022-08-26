<template>
  <p class="wis-header__description wit-color--muted">
    <i class="mdi mdi-18px wit-offset-right--xs" :class="iconClass" />
    <span class="wit-text--overflow"><slot /></span>
  </p>
</template>

<script>

import { computed } from '@nuxtjs/composition-api'

export default {
    name: 'Description',

    props: {
        iconName: {
            required: false,
            default: null,
            type: String
        }
    },

    setup (props) {
        const iconClass = computed(() => `mdi-${props.iconName}`)
        return { iconClass }
    }
}
</script>

<style scoped lang="scss">
.wis-header__description {
    display: flex;
    align-items: center;
    line-height: 24px;
}
</style>
