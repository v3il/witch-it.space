<template>
  <div class="wit-grid" :style="gridStyle">
    <slot />
  </div>
</template>

<script>
export default {
    name: 'InfinityGrid',

    props: {
        cellWidth: {
            type: String,
            required: true
        },

        mobileCellWidth: {
            type: String,
            required: true
        },

        gridGap: {
            type: Number,
            required: false,
            default: 16
        }
    },

    computed: {
        gridStyle () {
            return {
                '--cell-width': this.cellWidth,
                '--mobile-cell-width': this.mobileCellWidth,
                '--grid-gap': `${this.gridGap}px`
            }
        }
    }
}
</script>

<style scoped lang="scss">
.wit-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--cell-width), 1fr));
    grid-column-gap: var(--grid-gap);
    grid-row-gap: var(--grid-gap);
    grid-auto-rows: max-content;
    justify-items: center;
}
</style>
