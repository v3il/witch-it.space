<template>
  <div v-if="profiles.length" class="wit-flex wit-flex--wrap wis-profiles__grid">
    <div v-for="profile in profiles" :key="profile.id" class="wit-paddings--xs wis-profiles__profile-container">
      <UserView
        :profile="profile"
        class="wit-block--full-height wit-profile-view"
        hide-icons
        hide-social-buttons
        hide-trade-button
        hide-note
        :avatar-size="50"
        mode="market"
      />
    </div>
  </div>

  <EmptyState v-else :text="$t('Profiles_NoProfiles')" icon="account-multiple-remove" class="wit-padding-top--sm" />
</template>

<script>
import UserView from '@/components/user/UserView.vue'
import { EmptyState } from '@/components/basic/index.js'

export default {
    name: 'ProfilesView',

    components: {
        EmptyState,
        UserView
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
    margin-left: calc(-1 * var(--offset-xs));
    margin-right: calc(-1 * var(--offset-xs));
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
