<template>
  <ul class="wit-flex wit-flex--center wit-top-tabs">
    <li
      v-for="(mode, index) in modes"
      :key="mode"
      :class="getTabClass(mode)"
      class="wit-top-tabs__tab wit-flex wit-flex--align-center"
    >
      <b-button type="is-ghost" class="wit-top-tabs__button" @click="switchMode(mode)">
        <slot :name="`tab${index}`" />
      </b-button>
    </li>
  </ul>
</template>

<script>
export default {
    name: 'TopTabs',

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

        getTabClass (mode) {
            return { active: mode === this.selectedMode }
        }
    }
}
</script>
