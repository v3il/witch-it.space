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

    <div v-if="selectedItem" style="flex-basis: 450px;" class="sp">
      <div class="iv wit-text--center1 wit-offset-bottom--sm wit-flex">
        <ItemView :item="selectedItem" style="max-width: 100px;" :is-item-shown="false" class="wit-offset-right--sm" />

        <div>
          <h4 class="wit-offset-bottom--sm wit-font-size--sm">
            {{ selectedItem.name }}
          </h4>

          <b-taglist>
            <b-tag type="is-primary">
              Primary
            </b-tag>
            <b-tag type="is-primary is-light">
              Light primary
            </b-tag>

            <b-tag type="is-success">
              Success
            </b-tag>
            <b-tag type="is-success is-light">
              Light success
            </b-tag>

            <b-tag type="is-danger">
              Danger
            </b-tag>
            <b-tag type="is-danger is-light">
              Light danger
            </b-tag>
          </b-taglist>
        </div>

        <!--        <p v-else>-->
        <!--          No-->
        <!--        </p>-->
      </div>
    </div>
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView'
import ItemFilters from '@/components/items/ItemFilters'
import { buildItemUrl } from '@/utils'

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
        },

        itemPreviewURL () {
            return buildItemUrl(this.selectedItem?.name)
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
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 500) {
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
    flex-basis: 300px;
    position: sticky;
    top: 86px;
    max-height: calc(100vh - 70px);
}

.wit-item-image__image {
    border-radius: 8px;
    display: block;
}

.iv {
    //position: fixed;
}
</style>
