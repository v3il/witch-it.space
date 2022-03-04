<template>
  <v-popover ref="popover" :placement="position">
    <slot name="trigger" />

    <div slot="popover" class="wit-paddings--xs1">
      <ul v-if="$slots.items" @click="onClick">
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

    methods: {
        onClick ({ target }) {
            if (!target.closest('li')) {
                return
            }

            this.$refs.popover.hide()
        }
    }
}
</script>

<style scoped>

</style>
