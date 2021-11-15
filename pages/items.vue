<template>
  <div class="wit-items wit-flex">
    <div style="flex: 1;">
      <ItemFilters :filters-data="filters" class="wit-offset-bottom--sm" @change="onFiltersChange" />

      <div class="wit-flex1 wit-flex--justify-center">
        <div class="wit-flex wit-flex--wrap  aaa">
          <ItemView
            v-for="item in slicedItems"
            :key="item.id"
            :item="item"
            @clicked="selectedItem = item"
          />
        </div>
      </div>
    </div>

    <div style="flex-basis: 300px;" class="sp">
      <div class="iv">
        <template v-if="selectedItem">
          <h4>{{ selectedItem.name }}</h4>

          <ItemView
            :item="selectedItem"
            :item-count="Math.floor(Math.random() * 10)"
            style="max-width: 125px;"
          />
        </template>

        <p v-else>
          No
        </p>
      </div>
    </div>
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

        selectedItem: null,

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
            return this.filteredItems.slice(0, this.page * 100)
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
            const { query: params } = this.$route

            this.filters.query = params.query ?? ''
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
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-column-gap: 8px;
    justify-items: center;
    grid-row-gap: 16px;

    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
}

.sp {
    padding: 0 16px;
}

.iv {
    position: fixed;
}
</style>
