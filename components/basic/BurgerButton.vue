<template>
  <b-button type="is-ghost" class="wis-burger-button" @click="onClick">
    <div class="wis-burger-button__line-container">
      <i class="wis-burger-button__line" />
      <i class="wis-burger-button__line" />
      <i class="wis-burger-button__line" />
    </div>
  </b-button>
</template>

<script>
export default {
    name: 'BurgerButton',

    setup (_, { emit }) {
        const onClick = () => emit('click')

        return { onClick }
    }
}
</script>

<style scoped lang="scss">
.wis-burger-button {
    padding: 0;
    display: flex;
    flex-direction: column;
}

.wis-burger-button__line-container {
    width: 20px;
    height: 18px;
    display: flex;
    flex-direction: column;
}

.wis-burger-button__line {
    height: 1px;
    background-color: currentColor;
    display: inline-block;

    &:not(:last-child) {
        margin-bottom: 6px;
    }
}
</style>
