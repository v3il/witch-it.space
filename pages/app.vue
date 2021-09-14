<template>
  <div>
    App

    <p>{{ $store.state.list }}</p>
  </div>
</template>

<script>
export default {
    // async created () {
    //     // console.log(this.$store)
    //
    //     this.$store.commit('add', 'Test')
    //
    //     const { data } = await this.$axios.get('/api/ttt')
    //
    //     this.article = data
    // }
}
</script>
