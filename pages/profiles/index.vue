<template>
  <div class="wis-profiles">
    <ProfilesFilter class="wit-offset-bottom--sm" />

    <div>
      <ProfileView v-for="profile in profiles" :key="profile.id" :profile="profile" />
    </div>
  </div>
</template>

<script>
import ProfilesFilter from '@/components/profiles/ProfilesFilter'
import ProfileView from '@/components/profiles/ProfileView'

export default {
    components: {
        ProfilesFilter,
        ProfileView
    },

    middleware: ['fetchUser'],

    data: () => ({
        profiles: []
    }),

    async created () {
        this.profiles = (await this.$axios.get('/api/profiles')).data.profiles

        // console.log(this.$store)

        // this.$store.commit('add', 'Test')

        // console.log('Created')

        // console.log()
    },

    methods: {

    }
}
</script>

<style scoped lang="scss">
.wis-profiles {
    padding: var(--offset-lg) 0 var(--offset-sm);
    max-width: 1200px;
    margin: 0 auto;
}
</style>
