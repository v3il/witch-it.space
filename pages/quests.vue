<template>
  <div>
    Settings

    <Quests :quests="weeklyQuests" :can-replace="false" @replace="r" />
    <hr>
    <Quests :quests="dailyQuests" :can-replace="false" @replace="r" />

    <button @click="l">
      Load
    </button>

    <p>{{ formattedTime }}</p>
  </div>
</template>

<script>
import Quests from '@/components/quests/Quests'
import { config } from '@/shared'

export default {

    components: {
        Quests
    },

    middleware: ['fetchUser'],

    data: () => ({
        weeklyQuests: [],
        dailyQuests: [],
        canReplaceDailyQuests: false,
        canReplaceWeeklyQuests: false,
        questsUpdateTimestamp: 0,
        formattedTime: '',
        tsId: 0
    }),

    async created () {
        try {
            const { weeklyQuests, dailyQuests, canReplaceWeeklyQuests, canReplaceDailyQuests, questsUpdateTimestamp } = (await this.$axios.get('/api/quests')).data

            this.weeklyQuests = weeklyQuests
            this.dailyQuests = dailyQuests
            this.canReplaceDailyQuests = canReplaceDailyQuests
            this.canReplaceWeeklyQuests = canReplaceWeeklyQuests
            this.questsUpdateTimestamp = questsUpdateTimestamp
        } catch (e) {
            console.log(e)
        }

        this.tsId = setInterval(this.recalcTimer, 1000)
        this.recalcTimer()
    },

    destroyed () {
        return clearInterval(this.tsId)
    },

    methods: {
        async l () {
            try {
                const { weeklyQuests, dailyQuests, canReplaceWeeklyQuests, canReplaceDailyQuests, questsUpdateTimestamp } = (await this.$axios.post('/api/quests/update')).data

                this.weeklyQuests = weeklyQuests
                this.dailyQuests = dailyQuests
                this.canReplaceDailyQuests = canReplaceDailyQuests
                this.canReplaceWeeklyQuests = canReplaceWeeklyQuests
                this.questsUpdateTimestamp = questsUpdateTimestamp
            } catch (e) {
                console.log(e)
            }

            this.tsId = setInterval(this.recalcTimer, 1000)
            this.recalcTimer()
        },

        async r (quest) {
            console.log(quest)

            try {
                const { weeklyQuests, dailyQuests } = (await this.$axios.post('/api/quests/replace', {
                    questId: quest.id
                })).data

                this.weeklyQuests = weeklyQuests
                this.dailyQuests = dailyQuests
            } catch (e) {
                console.log(e)
            }
        },

        recalcTimer () {
            const nextUpdate = this.questsUpdateTimestamp + config.QUESTS_UPDATE_TIMEOUT
            const diff = nextUpdate - Math.floor(Date.now() / 1000)

            console.log(diff)

            if (diff <= 0) {
                this.formattedTime = '00:00'
                return clearInterval(this.tsId)
            }

            const secs = diff % 60
            const mins = Math.floor((diff - secs) / 60)

            this.formattedTime = `${mins}:${secs}`
        }
    }
}
</script>
