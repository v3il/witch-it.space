<template>
  <div class="wit-flex">
    <b-button
      v-for="(mode, index) in modes"
      :key="mode"
      type="is-ghost"
      class="wit-tabs__button"
      :class="getTabClass(mode, index)"
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

        getTabClass (mode, index) {
            return [{
                active: mode === this.selectedMode,
                expanded: this.expanded,
                first: index === 0,
                last: index === this.modes.length - 1
            }, `wit-tabs__button--${this.size}`]
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
