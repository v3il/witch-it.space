<template>
  <div class="wit-flex wit-flex--center">
    <div class="wit-flex wit-flex--align-center wit-position--relative">
      <span v-if="price.itemCount > 1" class="ic">&times;{{ price.itemCount }}</span>
      <ItemView :item="item1" :is-title-shown="false" class="aaa wit-offset-left--xxs1" />
    </div>

    <span v-if="hasTwoItems" class="plus wit-color--muted">+</span>

    <div class="wit-flex wit-flex--align-center wit-position--relative">
      <span v-if="price.itemCount2 > 1" class="ic">&times;{{ price.itemCount2 }}</span>
      <ItemView :item="item2" :is-title-shown="false" class="aaa wit-offset-left--xxs1" />
    </div>
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView'

export default {
    name: 'ItemPrice',

    components: {
        ItemView
    },

    props: {
        price: {
            type: Object,
            required: true
        }
    },

    data: () => ({
        item1: null,
        item2: null
    }),

    computed: {
        hasTwoItems () {
            return this.item1 && this.item2
        }
    },

    created () {
        const items = this.$store.state.items.items

        this.item1 = items[this.price.itemId]
        this.item2 = items[this.price.itemId2]
    }
}
</script>

<style scoped>
.ic {
    /*font-size: 11px;*/
    font-size: 10px;
    position: absolute;
    /*background: red;*/
    /*padding: 2px;*/
    z-index: 2;
    display: inline-block;
    padding: 0.25em 0.4em;
    /* font-size: 75%; */
    font-weight: 500;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    /*border-radius: 0.25rem;*/
    background-color: var(--danger);
    border-radius: 50rem !important;
    right: -5px;
    top: -5px;
}

.aaa {
    width: 40px;
}

.plus {
    margin: 0 8px;
}
</style>
