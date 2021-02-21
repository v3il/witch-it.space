<template>
  <div class="wis-profiles">
    <ProfilesFilter class="wit-offset-bottom--sm" />

    <div class="wis-profiles__grid">
      <ProfileView v-for="profile in profiles" :key="profile.id" :profile="profile" class="wis-profiles__profile" />
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
    max-width: 1350px;
    margin: 0 auto;
}

.wis-profiles__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    column-gap: 16px;
    row-gap: 16px;
    justify-items: center;
}

.wis-profiles__profile {
    width: 250px;
}
</style>
