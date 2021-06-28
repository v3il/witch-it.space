<template>
  <div class="wit-flex wit-flex--align-center">
    {{ price.itemCount }} &times;
    <ItemView :item="item1" :is-title-shown="false" style="width: 40px;" class="wit-offset-right--xxs wit-offset-left--xxs" />
    + {{ price.itemCount2 }} &times;
    <ItemView :item="item2" :is-title-shown="false" style="width: 40px;" class="wit-offset-right--xxs wit-offset-left--xxs" />
    + {{ price.itemCount3 }} &times;
    <ItemView :item="item3" :is-title-shown="false" style="width: 40px;" class="wit-offset-right--xxs wit-offset-left--xxs" />
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
    }
}
</script>

<style scoped>

</style>
