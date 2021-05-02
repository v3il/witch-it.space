<template>
  <div class="wis-profiles">
    <ProfilesFilter class="wit-offset-bottom--sm" />

    <div class="wis-profiles__grid">
      <div v-for="profile in profiles" :key="profile.id" class="wit-paddings--xs wr">
        <ProfileView :profile="profile" class="wis-profiles__profile" />
      </div>
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
    padding: var(--offset-lg) var(--offset-md) var(--offset-sm);
    //max-width: 1350px;
    //margin: 0 auto;
}

.wis-profiles__grid {
    display: flex;
    flex-wrap: wrap;
    margin-left: -8px;
    margin-right: -8px;
}

.wis-profiles__profile {
    //flex-basis: 350px;
    //margin: 16px;
}

.wr {
    flex: 0 0 auto;

    @media screen and (max-width: 767px) {
        width: 100%;
    }

    @media screen and (min-width: 768px) {
        width: 50%;
    }

    @media (min-width: 1200px) {
        width: 33.33333%;
    }

    @media (min-width: 1920px) {
        width: 25%;
    }

    //flex-basis: 350px;
}
</style>
