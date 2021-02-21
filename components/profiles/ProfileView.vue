<template>
  <div class="wit-flex">
    <img
      :src="`images/${profile.avatarId}.png`"
      alt="Hey!"
      width="60px"
      height="60px"
      style="border-radius: 50%;"
    >

    <div>
      <p>{{ profile.displayName }}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ProfileView',

    props: {
        profile: {
            required: true,
            type: Object
        }
    }
}
</script>

<style scoped>

</style>
