<template>
  <input v-bind="$attrs" class="wit-input wit-block wit-block--full-width" @input="onInput">
</template>

<script>
export default {
    name: 'Input',

    props: {
        value: {
            type: [String, Number],
            required: true
        }
    },

    methods: {
        onInput ({ target }) {
            this.$emit('input', target.value)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-input {
    color: var(--input-color);
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    box-sizing: border-box;
    border-radius: var(--offset-xxs);
    padding: var(--offset-xs) var(--offset-sm);
    line-height: var(--line-height-md);
    background-clip: padding-box;
    appearance: none;
    transition: border-color var(--default-transition), box-shadow var(--default-transition), background-color var(--default-transition), color var(--default-transition);

    &::placeholder {
        color: var(--input-color);
    }

    &:hover,
    &:focus {
        color: var(--input-color-active);
        background-color: var(--input-bg-active);
        border-color: var(--input-border-active);
        outline: 0;
        box-shadow: none;
    }
}
</style>
