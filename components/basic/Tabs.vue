<template>
  <div class="wit-flex">
    <b-button
      v-for="(mode, index) in modes"
      :key="mode"
      type="is-ghost"
      :class="getTabClass(mode, index)"
      class="wis-btn--rounded wit-offset-right--xs wit-tabs__button"
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
            if (mode === this.selectedMode) {
                return
            }

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
    border: 1px solid var(--secondary-button-bg);
}
</style>
