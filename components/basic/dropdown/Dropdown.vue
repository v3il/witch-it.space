<template>
  <b-dropdown ref="popover" :position="popoverPosition" v-bind="$attrs" class="wit-dropdown--offset-xxs" :class="popoverClass">
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
        },

        hideOnItemClick: {
            required: false,
            type: Boolean,
            default: true
        },

        expanded: {
            required: false,
            type: Boolean,
            default: false
        }
    },

    computed: {
        popoverPosition () {
            return this.position === 'start' ? 'is-bottom-right' : 'is-bottom-left'
        },

        popoverClass () {
            return { expanded: this.expanded }
        }
    },

    methods: {
        onClick ({ target }) {
            if (!target.closest('li') || !this.hideOnItemClick) {
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
