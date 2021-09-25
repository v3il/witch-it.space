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
    color: var(--gray-700);
    background: var(--white);
    border: 1px solid var(--gray-400);
    box-sizing: border-box;
    border-radius: var(--offset-xxs);
    padding: var(--offset-xs) var(--offset-sm);
    line-height: var(--line-height-md);
    background-clip: padding-box;
    appearance: none;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:hover,
    &:focus {
        border-color: var(--primary);
        outline: 0;
        box-shadow: none;
    }
}
</style>
