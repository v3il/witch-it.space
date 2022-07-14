<template>
  <div class="wit-flex wit-flex--justify-center">
    <b-button
      v-for="(mode, index) in modes"
      :key="mode"
      type="is-ghost"
      :class="getTabClass(mode, index)"
      class="wis-btn--rounded wit-offset-right--xs"
      @click="switchMode(mode)"
    >
      <slot :name="`tab${index}`" />
    </b-button>
  </div>
</template>

<script>
export default {
    name: 'Tabs',

    props: {
        modes: {
            required: true,
            type: Array
        },

        selectedMode: {
            required: true,
            type: String
        },

        expanded: {
            required: false,
            type: Boolean,
            default: false
        },

        size: {
            required: false,
            type: String,
            default: 'sm'
        }
    },

    methods: {
        switchMode (mode) {
            this.$emit('switch', mode)
        },

        getTabClass (mode) {
            return {
                'is-secondary': mode === this.selectedMode
            }
        }
    }
}
</script>

<style scoped lang="scss">
.wit-tabs__button {
    background: #2e3648;
    color: var(--muted-text-color);
    border-color: #363e54;
    text-decoration: none !important;
    border-radius: 0;

    &.first {
        border-radius: var(--offset-xxs) 0 0 var(--offset-xxs);
    }

    &.last {
        border-radius: 0 var(--offset-xxs) var(--offset-xxs) 0;
    }

    &:hover {
        color: var(--white);
    }

    &.expanded {
        flex: 1;
    }

    &.active {
        background-color: var(--primary);
        color: var(--white);
        border-color: var(--primary);
    }

    &--xs {
        height: var(--offset-lg);
    }
}

@media (max-width: 1100px) {
    .wit-tabs__button {
        padding: var(--offset-xxs) var(--offset-xs);
    }
}
</style>
