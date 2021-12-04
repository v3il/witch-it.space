<template>
  <div class="wit-flex wit-flex--align-center">
    <template v-if="item1">
      <div class="wit-flex wit-flex--column wit-flex--align-center wit-position--relative">
        <span v-if="price.itemCount > 1" class="ic">&times;{{ price.itemCount }}</span>
        <ItemView :item="item1" :is-title-shown="false" class="aaa wit-offset-right--xxs1 wit-offset-left--xxs1" />
      </div>
      <span class="plus">+</span>
    </template>

    <template v-if="item2">
      <div class="wit-flex wit-flex--column wit-flex--align-center wit-position--relative">
        <span v-if="price.itemCount2 > 1" class="ic">&times;{{ price.itemCount2 }}</span>
        <ItemView :item="item2" :is-title-shown="false" class="aaa wit-offset-right--xxs1 wit-offset-left--xxs1" />
      </div>
      <span class="plus">+</span>
    </template>

    <template v-if="item3">
      <div class="wit-flex wit-flex--column wit-flex--align-center wit-position--relative">
        <span v-if="price.itemCount3 > 1" class="ic">&times;{{ price.itemCount3 }}</span>
        <ItemView :item="item3" :is-title-shown="false" class="aaa wit-offset-right--xxs1 wit-offset-left--xxs1" />
      </div>
    </template>
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

    created () {
        this.item1 = this.$itemsService.getById(this.price.itemId)
        this.item2 = this.$itemsService.getById(this.price.itemId2)
        this.item3 = this.$itemsService.getById(this.price.itemId3)

        console.log(this.item1)
        console.log(this.item2)
        console.log(this.item3)
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
    background-color: #02a499 !important;
    border-radius: 50rem !important;
    right: -5px;
    top: -5px;
}

.aaa {
    width: 40px;
}

.plus {
    margin: 0 4px;
}
</style>
