<template>
  <div class="wit-flex wit-flex--wrap wit-items__item-grid" @scroll="onScroll">
    <slot :visibleItems="visibleItems" />
  </div>
</template>

<script>
const SCROLL_OFFSET = 400
const ITEMS_PER_PAGE = 100

export default {
    name: 'ItemsList',

    props: {
        items: {
            type: Array,
            required: true
        }
    },

    data: () => ({
        page: 1
    }),

    computed: {
        visibleItems () {
            return this.items.slice(0, ITEMS_PER_PAGE * this.page)
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
.wit-items__item-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-column-gap: var(--offset-sm);
    grid-auto-rows: max-content;
    grid-row-gap: var(--offset-sm);
    justify-items: center;
    overflow-y: scroll;
    padding-right: var(--offset-xs);

    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
}
</style>
