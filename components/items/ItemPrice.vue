<template>
  <div class="wit-flex wit-flex--center">
    <div v-if="item1" class="wit-flex wit-flex--align-center wit-position--relative">
      <!--      <span v-if="isTimesVisible" class="wit-color&#45;&#45;muted wit-offset-right&#45;&#45;xxs">&times;</span>-->
      <span v-if="price.item1Count > 1" class="wit-price__counter wit-offset-right--xxs wit-text--right">{{ price.item1Count }}</span>
      <ItemView add-tooltip :item="item1" :is-title-shown="false" class="wit-price__item wit-position--relative" />
    </div>

    <span v-if="hasTwoItems" class="wit-price__plus wit-color--muted1">+</span>

    <div v-if="item2" class="wit-flex wit-flex--align-center wit-position--relative">
      <ItemView add-tooltip :item="item2" :is-title-shown="false" class="wit-price__item wit-position--relative" />
      <span v-if="price.item2Count > 1" class="wit-price__counter wit-offset-left--xxs wit-text--left">{{ price.item2Count }}</span>
      <!--      <span v-if="isTimesVisible" class="wit-offset-left&#45;&#45;xxs wit-color&#45;&#45;muted">&times;</span>-->
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
        },

        isTimesVisible () {
            return !this.item1 || !this.item2
        }

        // item1 () {
        //     return this.$itemsService.getById(this.price.item1Id)
        // },
        //
        // item2 () {
        //     return this.$itemsService.getById(this.price.item2Id)
        // }
    },

    created () {
        this.item1 = this.$itemsService.getById(this.price.item1Id)
        this.item2 = this.$itemsService.getById(this.price.item2Id)
    }
}
</script>

<style scoped>
.wit-price__counter {
    /*font-size: 12px;*/
    /*position: absolute;*/
    /*z-index: 2;*/
    /*padding: 0.25em 0.4em;*/
    /*font-weight: 500;*/
    /*color: var(--white);*/
    /*background-color: var(--danger);*/
    /*border-radius: 50rem;*/
    /*right: -5px;*/
    /*top: -5px;*/

    /*font-size: 10px;*/
    /*position: absolute;*/
    /*z-index: 2;*/
    /*padding: 0.25em 0.25em;*/
    /*font-weight: 500;*/
    /*!*color: var(--white);*!*/
    /*background-color: #2a3042;*/
    /*color: var(--red-300);*/
    /*border-radius: 3px 0 0 0;*/
    /*left: 1px;*/
    /*top: 1px;*/
    /*margin: 0 !important;*/
    /*border: 1px solid #363e54;*/
    /*min-width: 16px;*/

    font-size: 11px;
    line-height: 32px;
    /*position: absolute;*/
    /*z-index: 2;*/
    /*padding: 1px 3px;*/
    /*text-align: center;*/
    font-weight: 500;
    /*color: var(--color);*/
    /*background-color: var(--bg-color);*/
    /*!* color: var(--red-300); *!*/
    /*border-radius: 0 2px 0 5px;*/
    /*right: 0;*/
    /*top: 0;*/
    /*margin: 0 !important;*/
    /*!* border: 1px solid #363e54; *!*/
    min-width: 13px;
}

.wit-price__item {
    width: 32px;
    height: 32px;
}

.wit-price__plus {
    margin: 0 4px;
}
</style>
