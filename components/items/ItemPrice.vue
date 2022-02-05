<template>
  <div class="wit-flex wit-flex--center">
    <div v-if="item1" class="wit-flex wit-flex--align-center wit-position--relative">
      <span v-if="price.item1Count > 1" class="wit-price__counter">{{ price.item1Count }}</span>
      <ItemView :item="item1" :is-title-shown="false" class="wit-price__item" />
    </div>

    <span v-if="hasTwoItems" class="wit-price__plus wit-color--muted">+</span>

    <div v-if="item2" class="wit-flex wit-flex--align-center wit-position--relative">
      <span v-if="price.item2Count > 1" class="wit-price__counter">{{ price.item2Count }}</span>
      <ItemView :item="item2" :is-title-shown="false" class="wit-price__item" />
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
    font-size: 10px;
    position: absolute;
    z-index: 2;
    padding: 0.25em 0.4em;
    font-weight: 500;
    color: var(--white);
    background-color: var(--danger);
    border-radius: 50rem;
    right: -5px;
    top: -5px;
}

.wit-price__item {
    width: 40px;
}

.wit-price__plus {
    margin: 0 8px;
}
</style>
