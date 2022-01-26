<template>
  <b-button type="is-ghost" class="wit-paddings--none bbbb" @click="$emit('click')">
    <i class="mdi mdi-18px mdi-close zzz" />
  </b-button>
</template>

<script>
export default {
    name: 'RemoveButton'
}
</script>

<style scoped lang="scss">
.zzz {
    background-color: var(--danger);
    color: white;
    border-radius: 50%;
    height: 18px;
    width: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        font-size: 12px;
        line-height: 18px;
    }
}

.bbbb {
    width: 18px;
    height: 18px;
}
</style>
