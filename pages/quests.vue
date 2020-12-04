<template>
  <div>
    Settings

    <Quests :quests="weeklyQuests" :can-replace="false" @replace="$emit('replace', $event)" />
    <hr>
    <Quests :quests="dailyQuests" :can-replace="false" @replace="$emit('replace', $event)" />

    <button @click="l">
      Load
    </button>
  </div>
</template>

<script>
import Quests from '@/components/quests/Quests'

export default {

    components: {
        Quests
    },

    middleware: ['fetchUser'],

    data: () => ({
        weeklyQuests: [],
        dailyQuests: []
    }),

    async created () {
        try {
            const { weeklyQuests, dailyQuests } = (await this.$axios.get('/api/quests')).data

            this.weeklyQuests = weeklyQuests
            this.dailyQuests = dailyQuests
        } catch (e) {
            console.log(e)
        }
    },

    methods: {
        async l () {
            try {
                const { weeklyQuests, dailyQuests } = (await this.$axios.post('/api/quests/update')).data

                this.weeklyQuests = weeklyQuests
                this.dailyQuests = dailyQuests
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
