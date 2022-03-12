<template>
  <b-button
    type="is-ghost"
    class="wit-paddings--none wit-icon-button"
    :style="buttonStyle"
    :class="buttonClasses"
    :disabled="disabled"
    @click.stop="onClick"
  >
    <i class="mdi mdi-18px wit-icon-button__icon" :class="iconClass" />
  </b-button>
</template>

<script>
export default {
    name: 'IconButton',

    props: {
        icon: {
            type: String,
            required: true
        },

        type: {
            type: String,
            required: false,
            default: 'primary'
        },

        size: {
            type: Number,
            required: false,
            default: 18
        },

        disabled: {
            type: Boolean,
            required: false,
            default: false
        },

        circle: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    computed: {
        buttonStyle () {
            return {
                '--size': this.size + 'px'
            }
        },

        buttonClasses () {
            return {
                'wit-icon-button--circle': this.circle,
                'wit-icon-button--primary': this.type === 'primary',
                'wit-icon-button--danger': this.type === 'danger',
                'wit-icon-button--warning': this.type === 'warning'
            }
        },

        iconClass () {
            return `mdi-${this.icon}`
        }
    },

    methods: {
        onClick () {
            if (this.disabled) {
                return
            }

            this.$emit('click')
        }
    }
}
</script>

<style scoped lang="scss">
.wit-icon-button {
    width: var(--size);
    height: var(--size);

    &:hover {
        text-decoration: none;
    }

    &[disabled] {
        opacity: 0.55;
        background: transparent;
        border: 0;
    }
}

.wit-icon-button__icon {
    border-radius: var(--offset-xxs);
    height: var(--size);
    width: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        line-height: var(--size) !important;
    }
}

.wit-icon-button--circle .wit-icon-button__icon {
    border-radius: 50%;
}

.wit-icon-button--primary .wit-icon-button__icon {
    background-color: var(--primary);
    color: var(--white);
}

.wit-icon-button--danger .wit-icon-button__icon {
    background-color: var(--danger);
    color: var(--white);
}

.wit-icon-button--warning .wit-icon-button__icon {
    background-color: var(--yellow-400);
    color: var(--body-bg);
}
</style>
