<template>
  <div v-if="profiles.length" class="wit-flex wit-flex--wrap wis-profiles__grid">
    <ProfileView
      v-for="profile in profiles"
      :key="profile.id"
      :profile="profile"
      class="wis-profiles__profile"
    />
  </div>

  <EmptyState v-else :text="$t('Profiles_NoProfiles')" icon="account-multiple-remove" class="wit-padding-top--sm" />
</template>

<script>
import ProfileView from './ProfileView'
import { EmptyState } from '@/components/basic/index.js'

export default {
    name: 'ProfilesView',

    components: {
        EmptyState,
        ProfileView
    },

    props: {
        profiles: {
            required: true,
            type: Array
        }
    }
}
</script>

<style scoped lang="scss">
.wis-profiles__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-auto-rows: max-content;
    padding: 0 24px;
    gap: 24px;
}

.wis-profiles__profile {
    //flex: 0 1 300px;

    //@media (max-width: 1350px) {
    //    flex-grow: 1;
    //}
}
</style>
