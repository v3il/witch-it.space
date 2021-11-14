<template>
  <div class="wit-items">
    <ItemFilters :filters-data="filters" class="wit-offset-bottom--sm" @change="onFiltersChange" />

    <div class="wit-flex1 wit-flex--justify-center">
      <div class="wit-flex wit-flex--wrap  aaa">
        <ItemView
          v-for="item in slicedItems"
          :key="item.id"
          :item="item"
          :item-count="0"
        />
      </div>
    </div>

    {{ page }}
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView'
import ItemFilters from '@/components/items/ItemFilters'

export default {
    components: {
        ItemView,
        ItemFilters
    },

    middleware: ['fetchUser', 'fetchItems'],

    data: () => ({
        page: 1,

        filters: {
            query: ''
        }
    }),

    computed: {
        filteredItems () {
            const items = this.$store.state.items.items
            const lowerCasedQuery = this.filters.query.toLowerCase()

            return items.filter((item) => {
                const isFilteredByName = lowerCasedQuery ? item.name.toLowerCase().includes(lowerCasedQuery) : true
                // const isFilteredBySteamGuard = this.filtersData.isSteamGuarded ? item.isGuardProtected : true

                return isFilteredByName // && isFilteredBySteamGuard
            })
        },

        slicedItems () {
            return this.filteredItems.slice(0, this.page * 50)
        }
    },

    watch: {
        filters: {
            handler (filters) {
                const { query: params } = this.$route
                const isQuerySame = params.query === filters.query
                const isSteamGuardedSame = true // params.isSteamGuarded === filters.isSteamGuarded

                if (isQuerySame && isSteamGuardedSame) {
                    return
                }

                this.$router.replace({ path: this.$route.path, query: filters })
            }
        },

        $route: {
            deep: true,
            handler () {
                this.getFiltersFromRoute()
            }
        }
    },

    created () {
        this.getFiltersFromRoute()
    },

    mounted () {
        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 300) {
                this.page++
            }
        })
    },

    methods: {
        getFiltersFromRoute () {
            // const { query: params } = this.$route
            //
            // this.filtersData.query = params.query ?? ''
            // this.filtersData.isSteamGuarded = params.isSteamGuarded === 'true'
        },

        onFiltersChange (filters) {
            this.filters = filters
            this.page = 1
        }
    }
}
</script>

<style scoped lang="scss">
.wit-items {
    padding: var(--offset-md) 0 var(--offset-sm);

    @media screen and (max-width: 1024px) {
        padding-left: 0;
        padding-right: 0;
    }
}

.aaa {
    //margin-left: -8px;
    //margin-right: -8px;
    //align-items: stretch;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-column-gap: 8px;
    justify-items: center;
    grid-row-gap: 16px;
}
</style>
