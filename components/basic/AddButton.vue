<template>
  <b-button type="is-ghost" class="wit-paddings--none wit-remove-button" @click="$emit('click')">
    <i class="mdi mdi-18px mdi-plus wit-remove-button__icon" />
  </b-button>
</template>

<script>
export default {
    name: 'AddButton'
}
</script>

<style scoped lang="scss">
$size: 20px;

.wit-remove-button {
    width: $size;
    height: $size;

    &:hover {
        text-decoration: none;
    }
}

.wit-remove-button__icon {
    background-color: var(--primary);
    color: var(--white);
    border-radius: 50%;
    height: $size;
    width: $size;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        font-size: var(--text-size-xxs) !important;
        line-height: $size !important;
    }
}
</style>
