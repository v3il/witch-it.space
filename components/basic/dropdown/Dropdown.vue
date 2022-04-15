<template>
  <b-dropdown ref="popover" :position="popoverPosition" append-to-body1 class="wit-dropdown--offset-xxs">
    <template #trigger>
      <slot name="trigger" />
    </template>

    <div class="wit-popover__content">
      <ul v-if="$slots.items" class="wit-dropdown-items" @click="onClick">
        <slot name="items" />
      </ul>

      <slot v-else />
    </div>
  </b-dropdown>
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

    computed: {
        popoverPosition () {
            return this.position === 'start' ? 'is-bottom-right' : 'is-bottom-left'
        }
    },

    methods: {
        onClick ({ target }) {
            if (!target.closest('li')) {
                return
            }

            this.hide()
        },

        hide () {
            this.$refs.popover?.toggle()
        }
    }
}
</script>
