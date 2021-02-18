<template>
  <div class="wis-profiles">
    <ProfilesFilter />

    {{ users }}
  </div>
</template>

<script>
import ProfilesFilter from '@/components/profiles/ProfilesFilter'

export default {
    components: {
        ProfilesFilter
    },

    middleware: ['fetchUser'],

    data: () => ({
        users: []
    }),

    async created () {
        this.users = (await this.$axios.get('/api/profiles')).data

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
