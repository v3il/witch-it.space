<template>
  <div class="wit-flex wit-flex--center">
    <div v-if="item1" class="wit-flex wit-flex--align-center wit-position--relative">
      <span v-if="price.itemCount > 1" class="wit-price__counter">{{ price.itemCount }}</span>
      <ItemView :item="item1" :is-title-shown="false" class="wit-price__item" />
    </div>

    <span v-if="hasTwoItems" class="wit-price__plus wit-color--muted">+</span>

    <div v-if="item2" class="wit-flex wit-flex--align-center wit-position--relative">
      <span v-if="price.itemCount2 > 1" class="wit-price__counter">{{ price.itemCount2 }}</span>
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
    },

    created () {
        const items = this.$store.state.items.items

        this.item1 = items[this.price.itemId]
        this.item2 = items[this.price.itemId2]
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
