<template>
  <b-button type="is-transparent" class="wis-btn--rounded wit-offset-left--auto">
    <i class="mdi mdi-18px mdi-refresh wit-offset-right--xs" />
    Replace
  </b-button>
</template>

<script>
export default {
    name: 'QuestActions',

    props: {
        isCompleted: {
            required: true,
            type: Boolean
        }
    },

    setup (props) {

    }
}
</script>

<style scoped>

</style>
