<template>
  <div class="wit-flex wit-flex--justify-end wit-selected-item-overlay">
    <i class="mdi mdi-24px mdi-square-edit-outline wit-selected-item-overlay__icon" />
  </div>
</template>

<script>
export default {
    name: 'SelectedItemOverlay'
}
</script>

<style scoped lang="scss">
.wit-selected-item-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgb(34 39 54 / 55%);

    &__icon {
        margin: var(--offset-xxs) var(--offset-xs);
        color: var(--light-green);
    }
}
</style>
