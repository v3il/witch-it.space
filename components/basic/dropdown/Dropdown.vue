<template>
  <v-popover ref="popover" :placement="position" @show="isContentVisible = true" @apply-hide="hideContent">
    <slot name="trigger" />

    <div slot="popover">
      <ul v-if="$slots.items" v-show="isContentVisible" @click="onClick">
        <slot name="items" />
      </ul>

      <slot v-else />
    </div>
  </v-popover>
</template>

<script>
export default {
    name: 'Dropdown',

    props: {
        position: {
            required: true,
            type: String
        }
    },

    data: () => ({
        isContentVisible: false
    }),

    mounted () {
        this.$refs.popover.hide()
    },

    methods: {
        onClick ({ target }) {
            if (!target.closest('li')) {
                return
            }

            this.$refs.popover.hide()
        },

        hideContent () {
            setTimeout(() => { this.isContentVisible = false }, 50)
        }
    }
}
</script>

<style scoped>

</style>
