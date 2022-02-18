<template>
  <div class="wit-grid" :style="gridStyle">
    <slot />
  </div>
</template>

<script>
const SCROLL_OFFSET = 400
const ITEMS_PER_PAGE = 30

export default {
    name: 'InfinityGrid',

    props: {
        // items: {
        //     type: Array,
        //     required: true
        // },

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
            default: 12
        }
    },

    // data: () => ({
    //     page: 1
    // }),

    computed: {
        // visibleItems () {
        //     return this.items.slice(0, ITEMS_PER_PAGE * this.page)
        // },

        gridStyle () {
            return {
                '--cell-width': this.cellWidth,
                '--mobile-cell-width': this.mobileCellWidth,
                '--grid-gap': `${this.gridGap}px`
            }
        }
    }

    // watch: {
    //     items () {
    //         this.$el.scrollTo({ top: 0 })
    //         this.page = 1
    //     }
    // },

    // methods: {
    //     onScroll () {
    //         if (this.$el.scrollTop >= (this.$el.scrollHeight - this.$el.offsetHeight) - SCROLL_OFFSET) {
    //             this.page++
    //         }
    //     }
    // }
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
    //overflow-y: scroll;
    //padding-right: var(--offset-sm);

    @media screen and (max-width: 768px) {
        justify-content: center;
        grid-template-columns: repeat(auto-fit, minmax(var(--mobile-cell-width), var(--mobile-cell-width)));
    }
}
</style>
