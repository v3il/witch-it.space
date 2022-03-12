<template>
  <div class="wit-flex wit-flex--center wit-selected-item-overlay">
    <i class="mdi mdi-36px mdi-check-circle wit-selected-item-overlay__icon" />
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
    z-index: 2;

    &__icon {
        margin: var(--offset-xxs) var(--offset-xxs);
        color: var(--light-green);
    }
}
</style>
