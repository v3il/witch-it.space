<template>
  <div class="wit-flex wit-flex--center">
    <b-button type="is-ghost" class="is-large1">
      All <span class="badge rounded-pill bg-primary float-end">{{ profiles.length }}</span>
      <!--      <b-icon class="is-size-5 wit-color&#45;&#45;Y400" icon="dots-grid" />-->
    </b-button>

    <b-button type="is-ghost" class="is-large1">
      Guarded <span class="badge rounded-pill bg-primary float-end">{{ filteredProfiles.length }}</span>
      <!--      <b-icon class="is-size-5 wit-color&#45;&#45;Y400" icon="dots-grid" />-->
    </b-button>
  </div>
</template>

<script>
export default {
    name: 'TopTabs'
}
</script>

<style scoped>

</style>
