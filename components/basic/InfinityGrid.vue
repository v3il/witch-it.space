<template>
  <div class="wit-infinity-grid" :style="gridStyle" @scroll="onScroll">
    <slot :visibleItems="visibleItems" />
  </div>
</template>

<script>
const SCROLL_OFFSET = 400
const ITEMS_PER_PAGE = 75

export default {
    name: 'InfinityGrid',

    props: {
        items: {
            type: Array,
            required: true
        },

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

    data: () => ({
        page: 1
    }),

    computed: {
        visibleItems () {
            return this.items.slice(0, ITEMS_PER_PAGE * this.page)
        },

        gridStyle () {
            return {
                '--cell-width': this.cellWidth,
                '--mobile-cell-width': this.mobileCellWidth,
                '--grid-gap': `${this.gridGap}px`
            }
        }
    },

    watch: {
        items () {
            this.$el.scrollTo({ top: 0 })
            this.page = 1
        }
    },

    methods: {
        onScroll () {
            if (this.$el.scrollTop >= (this.$el.scrollHeight - this.$el.offsetHeight) - SCROLL_OFFSET) {
                this.page++
            }
        }
    }
}
</script>

<style scoped lang="scss">
.wit-infinity-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--cell-width), 1fr));
    grid-column-gap: var(--grid-gap);
    grid-row-gap: var(--grid-gap);
    grid-auto-rows: max-content;
    justify-items: center;
    overflow-y: scroll;
    padding-right: var(--offset-xs);

    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(var(--mobile-cell-width), 1fr));
    }
}
</style>
