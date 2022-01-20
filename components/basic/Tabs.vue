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
        }
    },

    methods: {
        switchMode (mode) {
            this.$emit('switch', mode)
        },

        getTabClass (mode, index) {
            return {
                active: mode === this.selectedMode,
                'wit-split-part--left': index === 0,
                'wit-split-part--right': index === 1
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

    &:hover {
        color: var(--white);
    }
}

.wit-tabs__button.active {
    background-color: var(--primary);
    color: var(--white);
    border-color: var(--primary);
}
</style>
