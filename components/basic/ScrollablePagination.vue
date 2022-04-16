<template>
  <div class="wit-overflow--auto wit-block--full-height">
    <slot :visibleItems="visibleItems" />
  </div>
</template>

<script>
const SCROLL_OFFSET = 800

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
            window.scrollTo({ top: 0 })
            this.page = 1
        }
    },

    mounted () {
        window.addEventListener('scroll', this.onScroll, { passive: true })
    },

    beforeDestroy () {
        window.removeEventListener('scroll', this.onScroll)
    },

    methods: {
        onScroll () {
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - SCROLL_OFFSET) {
                this.page++
            }
        }
    }
}
</script>
