<template>
  <!--  <div>-->
  <b-dropdown aria-role="list" class="wit-materials-dropdowb">
    <template #trigger>
      <b-button
        type="is-link"
        style="width: 50px; height: 36px;"
      >
        <i class="mdi mdi-24 mdi-plus" />
        {{ itemId }}
      </b-button>
    </template>

    items
  </b-dropdown>
<!--  </div>-->
</template>

<script>
export default {
    name: 'PricePart',

    props: {
        itemId: {
            required: true,
            type: Number
        }
    }
}
</script>

<style scoped>

</style>
