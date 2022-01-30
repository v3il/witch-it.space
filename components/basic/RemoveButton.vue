<template>
  <b-button type="is-ghost" class="wit-paddings--none wit-remove-button" @click="$emit('click')">
    <i class="mdi mdi-18px mdi-close wit-remove-button__icon" />
  </b-button>
</template>

<script>
export default {
    name: 'RemoveButton'
}
</script>

<style scoped lang="scss">
$size: 18px;

.wit-remove-button {
    width: $size;
    height: $size;

    &:hover {
        text-decoration: none;
    }
}

.wit-remove-button__icon {
    background-color: var(--danger);
    color: var(--white);
    border-radius: 50%;
    height: $size;
    width: $size;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        font-size: var(--text-size-xxs);
        line-height: $size;
    }
}
</style>
