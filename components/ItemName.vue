<template>
  <span :class="itemNameClass">{{ item.name }}</span>
</template>

<script>
export default {
    name: 'ItemName',

    props: {
        item: {
            required: true,
            type: Object
        }
    },

    computed: {
        itemNameClass () {
            return {
                veryrare: 'wit-item-name--very-rare',
                whimsical: 'wit-item-name--whimsical'
            }[this.item.tagRarity]
        }
    }
}
</script>

<style scoped lang="scss">
.wit-item-name--very-rare {
    color: var(--item-very-rare);
}

.wit-item-name--whimsical {
    color: var(--item-whimsical);
}
</style>
