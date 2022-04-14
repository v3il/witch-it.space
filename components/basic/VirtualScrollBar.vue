<template>
  <div ref="root" class="root" :style="rootStyle">
    <div ref="viewport" class="viewport" :style="viewportStyle">
      <div ref="spacer" class="spacer" :style="spacerStyle">
        <!--        <div v-for="offer in visibleItems" :key="offer.id">-->
        <ItemView
          v-for="offer in visibleItems"
          :key="offer.id"
          :item="offer.item"
        >
          <!--          <div class="wit-offer-controls">-->
          <!--            <IconButton-->
          <!--              icon="pencil-ruler"-->
          <!--              type="primary"-->
          <!--              circle-->
          <!--              :size="24"-->
          <!--            />-->
          <!--          </div>-->

          <!--          <div class="wit-offer-controls wit-offer-controls&#45;&#45;remove">-->
          <!--            <IconButton-->
          <!--              icon="close"-->
          <!--              type="danger"-->
          <!--              circle-->
          <!--              :size="24"-->
          <!--            />-->
          <!--          </div>-->
          <ItemPriceList :prices="offer.prices" />
        </ItemView>
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from 'lodash'
import IconButton from '@/components/basic/IconButton.vue'
import ItemView from '@/components/items/ItemView.vue'
import ItemPriceList from '@/components/items/ItemPriceList.vue'

export default {
    name: 'VirtualScrollBar',

    components: {
        IconButton,
        ItemView,
        ItemPriceList
    },

    props: {
        items: {
            required: true,
            type: Array
        }
    },

    data () {
        return {
            // A bunch of items with numbers from 1 to N, should be a props ideally
            // items: new Array(100000)
            //     .fill(null)
            //     .map((item, index) => 'Item ' + (index + 1)),
            // Total height of the root which contains all the list items in px
            rootHeight: 400,
            // Height of each row, give it an initial value but this gets calculated dynamically on mounted
            rowHeight: 30,
            // Current scroll top position, we update this inside the scroll event handler
            scrollTop: 0,
            // Extra padding at the top and bottom so that the items transition smoothly
            // Think of it as extra items just before the viewport starts and just after the viewport ends
            nodePadding: 20,

            itemsPerRow: 0,

            visibleItems1: []
        }
    },
    computed: {
        /**
         Total height of the viewport = number of items in the array x height of each item
         */
        viewportHeight () {
            return (this.itemCount / this.itemsPerRow) * this.rowHeight
        },
        /**
         Out of all the items in the massive array, we only render a subset of them
         This is the starting index from which we show a few items
         */
        startIndex () {
            let startNode = Math.floor(this.scrollTop / (this.rowHeight))

            // console.error(222, startNode)

            startNode = Math.max(0, startNode)

            // console.error(223, startNode)
            return startNode //* this.itemsPerRow
        },

        firstVisibleRow () {
            return Math.floor(this.scrollTop / this.rowHeight)
        },

        rowsPerScreen () {
            return 3 // Math.ceil(this.rootHeight / this.rowHeight)
        },

        maxItemsPerScreen () {
            return 12 * 5 // (this.rowsPerScreen + 1) // this.rowsPerScreen * this.itemsPerRow
        },

        /**
         This is the number of items we show after the starting index
         If the array has a total 10000 items, we want to show items from say index 1049 till 1069
         visible node count is that number 20 and starting index is 1049
         */
        // visibleNodeCount () {
        //     let rowsPerScreen = Math.ceil(this.rootHeight / this.rowHeight) // (Math.ceil(this.rootHeight / this.rowHeight) + 2 * this.nodePadding)
        //     console.log(11, rowsPerScreen, this.rootHeight / this.rowHeight)
        //
        //     rowsPerScreen = Math.min(this.itemCount - this.startIndex, rowsPerScreen)
        //     console.log('Rows per screen', rowsPerScreen)
        //
        //     return rowsPerScreen
        // },
        /**
         Subset of items shown from the full array
         */
        visibleItems () {
            const startRow = Math.max(0, this.firstVisibleRow - 1)

            console.log('visible', startRow)

            // console.error(
            //     (this.firstVisibleRow - 1) * this.itemsPerRow, '-',
            //     (this.firstVisibleRow + this.rowsPerScreen + 1) * this.itemsPerRow
            // )

            // console.log(startRow)

            return this.items.slice(
                startRow * this.itemsPerRow,
                startRow * this.itemsPerRow + this.maxItemsPerScreen
            )
        },
        itemCount () {
            // console.log('Items', this.items.length)
            return this.items.length
        },
        /**
         The amount by which we need to translateY the items shown on the screen so that the scrollbar shows up correctly
         */
        offsetY () {
            return this.startIndex * this.rowHeight
        },
        /**
         This is the direct list container, we apply a translateY to this
         */
        spacerStyle () {
            return {
                transform: 'translateY(' + this.offsetY + 'px)',
                willChange: 'transform'
            }
        },
        viewportStyle () {
            return {
                overflow: 'hidden',
                height: this.viewportHeight + 'px',
                position: 'relative'
            }
        },
        rootStyle () {
            return {
                // height: this.rootHeight + 'px',
                overflow: 'auto'
            }
        }
    },
    mounted () {
        this.handleScroll = throttle(this.handleScroll, 1000 / 60, { trailing: true })

        this.$refs.root.addEventListener(
            'scroll',
            this.handleScroll,
            { passive: true }
        )
        // Calculate that initial row height dynamically
        const largestHeight = this.calculateInitialRowHeight()

        this.rootHeight = this.$refs.root.getBoundingClientRect().height

        this.rowHeight =
            typeof largestHeight !== 'undefined' && largestHeight !== null
                ? largestHeight
                : 30

        this.itemsPerRow = this.calcItemsPerRow()

        // console.error(this.visibleItems, this.visibleNodeCount, this.startIndex)
    },
    destroyed () {
        this.$refs.root?.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        onScroll () {
            const scrollTop = this.$refs.root.scrollTop
            const firstVisibleRow = Math.floor(this.scrollTop / this.rowHeight)
        },

        handleScroll (event) {
            this.scrollTop = this.$refs.root.scrollTop
        },
        /**
         Find the largest height amongst all the children
         Remember each row has to be of the same height
         I am working on the different height version
         */
        calculateInitialRowHeight () {
            const children = this.$refs.spacer.children
            let largestHeight = 0
            for (let i = 0; i < children.length; i++) {
                if (children[i].offsetHeight > largestHeight) {
                    largestHeight = children[i].offsetHeight
                }
            }
            return largestHeight
        },

        calcItemsPerRow () {
            // const firstChildTop = this.$refs.spacer.children[0].getBoundingClientRect().top
            // const items = Array.from(this.$refs.spacer.children).slice(0, 20)
            //
            // let counter = 0
            //
            // for (let i = 0; i < 20; i++) {
            //     const itemBounds = items[i].getBoundingClientRect()
            //
            //     if (itemBounds.top === firstChildTop) {
            //         counter++
            //     } else {
            //         break
            //     }
            // }
            //
            // console.log(counter)

            return 12
        }
    }

}
</script>

<style scoped lang="scss">
.spacer {
    --cell-width: 130px;
    --grid-gap: 16px;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--cell-width), 1fr));
    grid-column-gap: var(--grid-gap);
    grid-row-gap: var(--grid-gap);
    grid-auto-rows: max-content;
    justify-items: center;
    //overflow-y: scroll;
    //padding-right: var(--offset-sm);

    //@media screen and (max-width: 768px) {
    //    justify-content: center;
    //    grid-template-columns: repeat(auto-fit, minmax(var(--mobile-cell-width), var(--mobile-cell-width)));
    //}
}
</style>
