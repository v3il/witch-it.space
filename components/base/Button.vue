<template>
  <button v-bind="$attrs" class="wit-button" :class="typeClass" @click="onClick">
    <slot />
  </button>
</template>

<script>
export default {
    name: 'Button',

    props: {
        btnClass: {
            type: String,
            required: false,
            default: 'primary'
        }
    },

    computed: {
        typeClass () {
            return `wit-button--${this.btnClass}`
        }
    },

    methods: {
        onClick () {
            this.$emit('click')
        }
    }
}
</script>

<style scoped lang="scss">
.wit-button {
    display: block;
    line-height: var(--line-height-md);
    color: var(--body-color);
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: var(--offset-xs) var(--offset-md);
    border-radius: var(--offset-xxs);
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &--primary {
        color: var(--white);
        background-color: var(--primary);
        border-color: var(--primary);

        &:hover,
        &:active {
            background-color: var(--bs-primary-hover);
            border-color: var(--default-border-color-hover);
        }
    }
}
</style>
