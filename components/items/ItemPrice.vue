<template>
  <div class="wit-flex wit-flex--align-center">
    <template v-if="$options.item1">
      <div class="wit-flex wit-flex--column1 wit-flex--align-center wit-position--relative">
        <span v-if="price.itemCount > 1" class="ic">{{ price.itemCount }}&times;</span>
        <ItemView :item="$options.item1" :is-title-shown="false" class="aaa wit-offset-right--xxs1 wit-offset-left--xxs1" />
      </div>

      <span v-if="hasSecondPrice" class="plus wit-color--muted">+</span>
    </template>

    <template v-if="$options.item2">
      <div class="wit-flex wit-flex--column1 wit-flex--align-center wit-position--relative">
        <span v-if="price.itemCount2 > 1" class="ic">{{ price.itemCount2 }}&times;</span>
        <ItemView :item="$options.item2" :is-title-shown="false" class="aaa wit-offset-right--xxs1 wit-offset-left--xxs1" />
      </div>

      <!--      <span v-if="hasThirdPrice" class="plus wit-color&#45;&#45;muted">+</span>-->
    </template>

    <!--    <template v-if="$options.item3">-->
    <!--      <div class="wit-flex wit-flex&#45;&#45;column wit-flex&#45;&#45;align-center wit-position&#45;&#45;relative">-->
    <!--        <span v-if="price.itemCount3 > 1" class="ic">&times;{{ price.itemCount3 }}</span>-->
    <!--        <ItemView :item="$options.item3" :is-title-shown="false" class="aaa wit-offset-right&#45;&#45;xxs1 wit-offset-left&#45;&#45;xxs1" />-->
    <!--      </div>-->
    <!--    </template>-->
  </div>
</template>

<script>
import ItemView from '@/components/items/ItemView'

export default {
    name: 'ItemPrice',

    item1: null,
    item2: null,
    item3: null,

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

    }),

    computed: {
        hasSecondPrice () {
            return this.$options.item2 || this.$options.item3
        },

        hasThirdPrice () {
            return this.$options.item3
        }
    },

    created () {
        // console.log(this.price)

        const items = this.$store.state.items.items

        this.$options.item1 = items[this.price?.itemId]
        this.$options.item2 = items[this.price?.itemId2]
        this.$options.item3 = items[this.price?.itemId3]

        // console.log(this.$options.item1)
        // console.log(this.$options.item2)
        // console.log(this.$options.item3)
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
    margin: 0 4px;
}
</style>
