<template>
  <div>
    Settings

    {{ weeklyQuests }}
    <br>
    {{ dailyQuests }}

    <button @click="l">
      Load
    </button>
  </div>
</template>

<script>
export default {
    middleware: ['fetchUser'],

    data: () => ({
        weeklyQuests: [],
        dailyQuests: []
    }),

    async created () {
        const { weeklyQuests, dailyQuests } = (await this.$axios.get('/api/quests')).data

        this.weeklyQuests = weeklyQuests
        this.dailyQuests = dailyQuests
    },

    methods: {
        async l () {
            const { weeklyQuests, dailyQuests } = (await this.$axios.get('/api/quests')).data

            this.weeklyQuests = weeklyQuests
            this.dailyQuests = dailyQuests
        }
    }
}
</script>
