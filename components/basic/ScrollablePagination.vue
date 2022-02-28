<template>
  <div class="scrollable-pagination wit-block--full-height" @scroll="onScroll">
    <slot :visibleItems="visibleItems" />
  </div>
</template>

<script>
const SCROLL_OFFSET = 400

export default {
    name: 'ScrollablePagination',

    props: {
        items: {
            type: Array,
            required: true
        },

        itemsPerPage: {
            type: Number,
            required: false,
            default: 50
        }
    },

    data: () => ({
        page: 1
    }),

    computed: {
        visibleItems () {
            return this.items.slice(0, this.itemsPerPage * this.page)
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
                this.onScrollToBottom()
            }
        },

        onScrollToBottom () {
            this.page++
        }
    }
}
</script>

<style scoped lang="scss">
.scrollable-pagination {
    overflow-y: auto;
}
</style>
